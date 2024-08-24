import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs";
import {ModalController} from "@ionic/angular";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // @ts-ignore
  recipes:Recipe[]
  // subscription:Subscription
  constructor(private modalController:ModalController,private recipeService:RecipeService) { }

  ngOnInit() {

  }

  ionViewWillEnter(){

  }
  ngOnDestroy(){

  }
  edit() {
    console.log("edit")
  }

  delete(){

  }
}
