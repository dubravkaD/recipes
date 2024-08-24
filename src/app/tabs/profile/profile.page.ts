import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController, ModalController} from "@ionic/angular";
import {RecipeModalComponent} from "./recipe-modal/recipe-modal.component";
import {AuthService} from "../../auth/auth.service";
import {RecipeDB, RecipeService} from "../recipe.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username:string=""
  constructor(
    private modalController:ModalController,
    private router:Router,
    private auth:AuthService,
    private alertController:AlertController,
    private recipeService:RecipeService
  ){

  }

  ngOnInit() {
    this.username=this.auth.getUsername()
  }

  addRecipe(){
    this.modalController.create({
      component:RecipeModalComponent,
      componentProps: {title:'Add Recipe'}
    }).then((modal:HTMLIonModalElement)=>{
      modal.present()
      return modal.onDidDismiss();
    }).then((res) =>{
      if(res.role==='add'){
        console.log(res.data.recipe)
        const recipeDB:RecipeDB={
          authorId:this.auth.getUserId(),
          title:res.data.recipe.title,
          instructions:res.data.recipe.instructions,
          ingredients:res.data.recipe.ingredients,
          category:res.data.recipe.category,
          createdAt:res.data.recipe.createdAt,
          updatedAt:res.data.recipe.updatedAt
        }
        this.recipeService.createRecipe(recipeDB)
          .subscribe(
            {next:()=>{console.log("success")},
              error:()=>{console.log("error with creating recipe")}}
          )
      }
    });
  }

  logout() {
    this.auth.logout()
    this.router.navigateByUrl('/login');
  }

  getUsername() {
    const displayName=this.auth.getUsername()
    this.alertController.create(
      {
        header: 'User name',
        message: `your user name is ${displayName}`,
        buttons: ['Confirm']
      }
    ).then((alert)=>{
      alert.present()
    })
  }

  getEmail() {
    const email=this.auth.getUserEmail()
    this.alertController.create(
      {
        header: 'User name',
        message: `your user name is ${email}`,
        buttons: ['Confirm']
      }
    ).then((alert)=>{
      alert.present()
    })
  }
}
