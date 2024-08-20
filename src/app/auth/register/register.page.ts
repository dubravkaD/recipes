import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {User} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm:FormGroup;
  constructor(public formBuilder:FormBuilder,private router:Router, private alertController:AlertController) {
    this.registerForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      username: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  register(){
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
      this.alertController.create({
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
              };
              console.log("handler");
              console.log(user);
              this.router.navigateByUrl("/login");
              this.registerForm.reset();
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
      });
      console.log(this.registerForm.value);
    }
  }

}
