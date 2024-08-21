import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../category";
import {Recipe} from "../../recipe.model";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  // @ts-ignore
  recipe:Recipe;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private alertController: AlertController) {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.recipe={id:paramMap.get('id')!!,authorId:'',ingredients:'',instructions:'',createdAt:new Date(),title:'Title',updatedAt: new Date(),category:Category.breakfast}
    });
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
