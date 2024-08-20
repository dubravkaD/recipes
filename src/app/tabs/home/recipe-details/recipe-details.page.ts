import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../category";
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  // @ts-ignore
  recipe:Recipe;
  constructor(private activatedRoute:ActivatedRoute,private router:Router) {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.recipe={id:paramMap.get('id')!!,authorId:'',ingredients:'',instructions:'',createdAt:new Date(),title:'Title',updatedAt: new Date(),category:Category.breakfast}
    });
  }

  ngOnInit() {
  }

}
