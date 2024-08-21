import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Recipe} from "./recipe.model";
import {environment} from "../../environments/environment";

export interface RecipeDB{
  authorId:string,
  title:string,
  ingredients:string,
  instructions:string,
  category:string,
  createdAt:Date,
  updatedAt:Date
}
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipe = new BehaviorSubject<Recipe[]>([])
  get recipes():Observable<Recipe[]>{
    return this._recipe.asObservable()
  }
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  createRecipe(){}

  updateRecipe(id:string){}

  readRecipes(){
    return this.httpClient.get<{ [p:string]:RecipeDB }>
    (
      `${environment.firebaseConfig.RealtimeDatabase}/recipes.json?auth=${this.authService.getToken()}`
    ).pipe(
      map((rec)=>{
        const recipes:Recipe[]=[]
        for(let p in rec){
          recipes.push({id:p,authorId:rec[p].authorId,title:rec[p].title,category:rec[p].category,ingredients:rec[p].ingredients,instructions:rec[p].instructions,createdAt:rec[p].createdAt,updatedAt:rec[p].updatedAt})
        }
        return recipes
      }),
      tap((recipes)=>{this._recipe.next(recipes)})
    )
  }

  readRecipe(id:string){
    return this.httpClient.get<RecipeDB>
    (
      `${environment.firebaseConfig.RealtimeDatabase}/recipes/${id}.json?auth=${this.authService.getToken()}`
    ).pipe(
      map((data)=>{
        return {
          id,authorId:data.authorId,title:data.title,category:data.category,ingredients:data.ingredients,instructions:data.instructions,createdAt:data.createdAt,updatedAt:data.updatedAt
        }
      })
    )
  }
  deleteRecipe(id:string){

  }

}
