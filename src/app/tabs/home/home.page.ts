import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs";
import {ModalController} from "@ionic/angular";
import {RecipeService} from "../recipe.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // @ts-ignore
  recipes:Recipe[]
  // @ts-ignore
  subscription:Subscription
  constructor(private modalController:ModalController,private recipeService:RecipeService,private auth:AuthService) { }

  ngOnInit() {
    this.subscription= this.recipeService.recipes.subscribe((recipes)=>{
      this.recipes=recipes
    })
  }

  ionViewWillEnter(){
    this.recipeService.readRecipes().subscribe()
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
  edit(recipe:Recipe) {
    if(recipe.authorId===this.auth.getUserId()){
      console.log("I am author")
    }
    console.log(recipe)
    console.log("edit")
  }

  delete(id:string,recipe:Recipe){
    // console.log("delete")
    if(this.auth.getUserId()===recipe.authorId){
      this.recipeService.deleteRecipe(id).subscribe(
        {next:()=>{console.log("success")},
          error:()=>{console.log('error with deleting')}
        })
    }else {
      alert("You cannot delete recipes that you are not author of")
    }

  }
}
