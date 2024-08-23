import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {RecipeModalComponent} from "./recipe-modal/recipe-modal.component";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username:string | undefined=""
  constructor(private modalController:ModalController, private router:Router,private auth:AuthService) {
    // this.username=this.auth.getUsername()
  }

  ngOnInit() {
  }

  addRecipe(){
    this.modalController.create({
      component:RecipeModalComponent,
      componentProps: {title:'Add Recipe'}
    }).then((modal:HTMLIonModalElement)=>{
      modal.present();
      return modal.onDidDismiss();
    }).then((res) =>{
      if(res.role==='add'){
        console.log(res.data.recipe);
      }
    });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
