import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs";
import {ModalController} from "@ionic/angular";
import {RecipeDB, RecipeService} from "../recipe.service";
import {AuthService} from "../../auth/auth.service";
import {RecipeModalComponent} from "../profile/recipe-modal/recipe-modal.component";
import {EditRecipeComponent} from "./edit-recipe/edit-recipe.component";

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
      this.modalController.create({
        component:EditRecipeComponent,
        componentProps: {title:'Update Recipe'}
      }).then((modal:HTMLIonModalElement)=>{
        modal.present()
        return modal.onDidDismiss();
      }).then((res)=>{
        if(res.role==='add') {
          console.log(res.data.recipe)
          const rec: Recipe = {
            authorId: this.auth.getUserId(),
            title: res.data.recipe.title,
            instructions: res.data.recipe.instructions,
            ingredients: res.data.recipe.ingredients,
            category: res.data.recipe.category,
            createdAt: recipe.createdAt,
            updatedAt: new Date(),
            id: recipe.id
          }
          this.recipeService.updateRecipe(rec)
            .subscribe(
              {
                next: () => {
                  console.log("success")
                },
                error: () => {
                  console.log("error with updating recipe")
                }
              }
            )
        }
      })
    }else {
      alert("You cannot edit recipes that you are not author of")
    }
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
