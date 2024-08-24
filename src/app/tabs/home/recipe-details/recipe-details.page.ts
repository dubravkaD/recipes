import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../category";
import {Recipe} from "../../recipe.model";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../../auth/auth.service";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  // @ts-ignore
  recipe:Recipe;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private alertController: AlertController,
    public auth:AuthService,
    private recipeService:RecipeService
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.recipe={id:paramMap.get('id')!!,authorId:'',ingredients:'',instructions:'',createdAt:new Date(),title:'Title',updatedAt: new Date(),category:Category.breakfast}
      recipeService.readRecipe(paramMap.get('id')!!).subscribe({next:(value)=>{
          this.recipe.id=value.id
          this.recipe.authorId=value.authorId
          this.recipe.title=value.title
          this.recipe.category=value.category
          this.recipe.instructions=value.instructions
          this.recipe.ingredients=value.ingredients
          this.recipe.updatedAt=new Date()
          this.recipe.createdAt=new Date()
        }})
    })
  }

  ngOnInit() {
  }

  delete() {
    if(true){
      this.alertController.create({
        header:"Delete",
        message:"Do you want to delete recipe?",
        buttons:[
          {
            text: "confirm",
            handler: () => {
              this.alertController.dismiss();
            }
          },
          {
            text: "cancel",
            handler: () => {
              this.alertController.dismiss();
            }
          }
        ]
      }).then((alert: HTMLIonAlertElement) => {
        alert.present();
      })
    }
  }

  edit() {

  }
}
