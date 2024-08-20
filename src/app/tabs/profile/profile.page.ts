import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {RecipeModalComponent} from "./recipe-modal/recipe-modal.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalController:ModalController, private router:Router) { }

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
