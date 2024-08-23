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
  profilePicture1?: string
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
  userM:UserModel
  // @ts-ignore
  user:User
  constructor(private httpC:HttpClient) { }

  get isUserAuthenticated(): boolean {
    if (this.userM) {
      return !!this.userM.token
    } else {
      return false
    }
  }

  register(user:User){
    this._isUserAuthenticated=true
    return this.httpC.post<AuthResponse>(
      `http://https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
      { email: user.email, password: user.password, returnSecureToken: true }
    )
  }

  updateProfile(profile:Profile,password:string){
    return this.httpC.post<ProfileResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebaseConfig.apiKey}`,
      {idToken:profile.idToken,displayName:profile.displayName,returnSecureToken:true}
    ).pipe(
      tap((data)=>{
          this.user.uid=data.localId
          this.user.username=data.displayName
          this.user.password=password
          this.user.email=data.email
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
    }))
  }

  getUserData(){

  }
  /*
  logout() {
    this.userM = null;
  }
*/

  getUsername(){
    return this.user.username
  }
  getToken() {
    return this.userM.token
  }
  getUserId() {
    return this.user.uid
  }
}
