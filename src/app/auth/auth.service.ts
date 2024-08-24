import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "./user.model";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";

export interface User {
  uid?: string;
  username?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  localId: string
  expiresIn: string
  registered?: boolean
  displayName?: string
  profilePicture?: string
}

export interface Profile{
  idToken: string,
  displayName: string
}

export interface ProviderUserInfo{
  providerId: string,
  displayName?: string,
  photoUrl?: string,
  federatedId?: string,
  email?: string,
  rawId: string,
  screenName?: string,
  phoneNumber?: string
}

export interface ProfileResponse{
  kind:string,
  localId:string,
  email:string,
  displayName:string,
  photoUrl:string,
  passwordHash:string,
  providerUserInfo?:Array<ProviderUserInfo>,
  idToken:string,
  refreshToken:string,
  expiresIn:string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated=false
  // @ts-ignore
  userM:UserModel | null
  // @ts-ignore
  user:User = {username:"",email:"",password:"",uid:""}
  constructor(private httpC:HttpClient) { }

  get isUserAuthenticated(): boolean {
    if (this.userM) {
      return !!this.userM.token
    } else {
      return false
    }
  }

  register(email:string,password:string){
    this._isUserAuthenticated=true
    return this.httpC.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
      { email: email, password: password, returnSecureToken: true }
    ).pipe(tap((data)=>{
      console.log(data)
    }))
    /*.pipe(
      tap((data)=>{
        const idToken=data.idToken
        const username=u.username!!
        const profile:Profile={idToken:idToken,displayName:username}
        this.updateProfile(profile,u.password)
          .subscribe({
            next:(value)=>{
              console.log("dobro")
              console.log(value)
            },
            error:(err)=>{
              console.log("greska")
              console.log(err)
            }
          }
          )
      }
      )
    )*/
  }

  updateProfile(profile:Profile,password:string){
    return this.httpC.post<ProfileResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebaseConfig.apiKey}`,
      {idToken:profile.idToken,displayName:profile.displayName,returnSecureToken:true}
    ).pipe(
      tap((data)=>{
        console.log(data)
          /*this.user.uid=data.localId
          this.user.username=data.displayName
          this.user.password=password
          this.user.email=data.email*/
      }
      )
    )
  }

  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
  login(email:string,password:string){
    this._isUserAuthenticated=true
    return this.httpC.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
      {email: email,password: password,returnSecureToken:true}
    ).pipe(tap((data)=>{
      // @ts-ignore
      const exTime= new Date( new Date().getTime()+data.expiresIn*1000)
      // @ts-ignore
      this.userM=new UserModel(data.localId, data.email, data.idToken, exTime)

      console.log(data.displayName)
      this.user.uid=data.localId
      this.user.email=data.email
      this.user.password=password
      this.user.username=data.displayName
      console.log(this.user)
      /*if(data.displayName!== undefined && data.displayName !== null){
        this.user.username=data.displayName as string
      }*/
    }))
  }
  setUser(user:User){
    this.user=user
  }
  getUserData(){

  }

  logout() {
    this.userM = null
  }


  getUsername(){
    /*if (this.user.username === undefined)
      return ""*/
    return this.user.username!!
  }
  getToken() {
    // @ts-ignore
    return this.userM.token!!
  }
  getUserId() {
    return this.userM?.id!!
  }

  getUserEmail() {
    return this.user.email
  }
}
