import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {AuthService, User, Profile} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm:FormGroup;
  private pro:Profile={
    idToken:"",
    displayName:""
  }
  constructor(public formBuilder:FormBuilder,private router:Router, private alertController:AlertController,private authService:AuthService) {
    this.registerForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      username: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  submit(){
    if(!this.registerForm.valid){
      this.alertController.create({
        header:"Invalid input",
        message:"Enter correct email, password(minimal length is 6 characters) and user name(maximal length is 30 characters)",
        buttons:[
          {
            text:"confirm",
            handler:()=>{
              this.alertController.dismiss();
            }
          }
        ],
      }).then((alert)=>{
        alert.present();
      });
    }else {
     /* this.register(
        this.registerForm.controls['username'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value
      ).subscribe({next:(value)=>{console.log("uspeh")},error:(err)=>{console.log("greska")}})*/

      this.authService.register(
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value)
        .subscribe(
          {
            next:(value)=>{
              console.log("uspeh",value)
              const profile:Profile={idToken:value.idToken,displayName:this.registerForm.controls['username'].value}
              this.authService.updateProfile(
                profile,
                this.registerForm.controls['password'].value
              )
                .subscribe(
                  {next:(value)=>{
                      this.registerForm.reset()
                      this.router.navigateByUrl('/login')
                      this.alertController.create({
                        header:"Registration",
                        message:"successful registration",
                        buttons:['Confirm']
                      })
                      console.log("uspeh display name",value)
                    },error:()=>{
                    this.alertController.create({
                      header:"Authentication error",
                      message:"unable to update display name",
                      buttons:['Cancel']
                    }).then((alert)=>{
                      alert.present()
                    })
                    console.log("greska display name")
                  }}
                )
             /* this.registerForm.reset()
              this.router.navigateByUrl('/login')*/
            },
            error:()=>{
              console.log("greska")
              this.alertController.create(
                {
                  header: 'Authentication failed',
                  message: 'incorrect email or password',
                  buttons: ['Okay']
                }
              ).then((alert)=>{
                alert.present()
              })
            }
          }
        )

      /*this.alertController.create({
        header:"Register",
        message:"Do you want to register",
        buttons:[
          {
            text:"Register",
            handler:()=>{
              const user:User= {
                email: this.registerForm.controls['email'].value,
                password: this.registerForm.controls['password'].value,
                uid: '',
                username: this.registerForm.controls['username'].value
              }
              console.log("handler")
              console.log(user)

              this.register(user).subscribe(
                {next:(value)=>{
                  console.log(value)
                  this.registerForm.reset()
                  this.router.navigateByUrl('/login')
                }, error:(err)=>{
                    console.log(err)
                    console.log("greska")
                  }
                })

              /!*if (this.register(user)){
                this.router.navigateByUrl("/login")
                this.registerForm.reset()
              }
              console.log("greska pri registraciji")*!/
              /!*if (this.register(user)){
                this.router.navigateByUrl("/login")
              }*!/
            }
          },
          {
            text: "Cancel",
            handler:()=>{
              this.alertController.dismiss();
            }
          }
        ],
      }).then((alert:HTMLIonAlertElement)=>{
        alert.present();
      });*/
      // console.log(this.registerForm.value);
    }
  }

  register(username:string,email:string,password:string){
    /*let isComplete = false
    this.authService.register(user).subscribe({next:(res)=>{
      console.log(res)
      this.pro.idToken=res.idToken
      if (user.username != null) {
        this.pro.displayName = user.username
      }else {
        this.pro.displayName=""
      }
      console.log(this.pro)
      this.authService.updateProfile(this.pro,user.password).subscribe(res=>{
        console.log(res)
        isComplete=true
      })
    },
    error:(err)=>{
      console.log(err)
    }
      }
    )
    return isComplete*/
    const u:User={username:username,password:password,email:email}
    return this.authService.register(email,password)
  }
}
