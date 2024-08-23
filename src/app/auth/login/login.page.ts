import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController,private authService:AuthService) { }

  ngOnInit() {
  }

  submit(form: NgForm) {
    console.log(form.valid);
    if (form.valid === true) {
      const email:string=form.controls['email'].value
      const password:string=form.controls['password'].value
      // console.log(form.controls['email'].value,form.controls['password'].value)
      console.log(email,password)
      this.login(email,password)
        .subscribe({next:()=>{
          form.resetForm()
          this.router.navigateByUrl('/tabs')
        },
        error:()=>{
          this.alertController.create(
            {
              header: 'Authentication failed',
              message: 'incorrect email or password',
              buttons: ['Okay']
            }
          ).then((alert)=>{
            alert.present()
            form.resetForm()
          })

        }
      })
      /*form.resetForm()
      this.router.navigateByUrl('/tabs')*/
    } else {
      this.alertController.create({
        header: "Invalid input",
        message: "Enter correct email, password(minimal length is 6 characters)",
        buttons: [
          {
            text: "confirm",
            handler: () => {
              this.alertController.dismiss();
            }
          }
        ]
      }).then((alert: HTMLIonAlertElement) => {
          alert.present();
        }
      );
    }
  }

  login(email:string,password:string){
    return this.authService.login(email,password)
  }
}
