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
      console.log(form.controls['email'].value,form.controls['password'].value);
      this.router.navigateByUrl('/tabs');
      form.resetForm();
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

  }
}
