import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, switchMap, take, tap} from "rxjs";
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

  createRecipe(recipeDB:RecipeDB){
    let genID:string
    const userid=this.authService.getUserId()
    return this.httpClient.post<{p:string}>(
      `${environment.firebaseConfig.RealtimeDatabase}/recipes.json?auth=${this.authService.getToken()}`,
      {
        authorId:recipeDB.authorId,
        title:recipeDB.title,
        ingredients:recipeDB.ingredients,
        instructions:recipeDB.instructions,
        category:recipeDB.category,
        createdAt:recipeDB.createdAt,
        updatedAt:recipeDB.updatedAt
      }
      ).pipe(
        switchMap((res)=>{
          genID=res.p
          return this.recipes
        }
        ),take(1),tap((recipes)=>{
          this._recipe.next(
            recipes.concat(
              {
                id:genID,
                authorId:recipeDB.authorId,
                title:recipeDB.title,
                ingredients:recipeDB.ingredients,
                instructions:recipeDB.instructions,
                category:recipeDB.category,
                createdAt:recipeDB.createdAt,
                updatedAt:recipeDB.updatedAt
              }
              )
          )
        }
        )
      )
  }

  updateRecipe(recipe:Recipe){
    return this.httpClient
      .put
      (
        `${environment.firebaseConfig.RealtimeDatabase}/recipes/${recipe.id}.json?auth=${this.authService.getToken()}`,
        {
          authorId:recipe.authorId,
          title:recipe.title,
          ingredients:recipe.ingredients,
          instructions:recipe.instructions,
          category:recipe.category,
          createdAt:recipe.createdAt,
          updatedAt:recipe.updatedAt
        }
      )
      .pipe
      (
        switchMap(()=>{return this.recipes}),
        take(1),
        tap((recipes)=>{
          const index=recipes.findIndex((r)=>r.id===recipe.id)
          const updated=[...recipes]
          updated[index]={
            id:recipe.id,
            title:recipe.title,
            authorId:recipe.authorId,
            ingredients:recipe.ingredients,
            instructions:recipe.instructions,
            category:recipe.category,
            createdAt:recipe.createdAt,
            updatedAt:recipe.updatedAt
          }
          this._recipe.next(updated)
        })
      )
  }

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
        return <Recipe>{
          id,authorId:data.authorId,title:data.title,category:data.category,ingredients:data.ingredients,instructions:data.instructions,createdAt:data.createdAt,updatedAt:data.updatedAt
        }
      })
    )
  }
  deleteRecipe(id:string){
    return this.httpClient.delete(
      `${environment.firebaseConfig.RealtimeDatabase}/recipes/${id}.json?auth=${this.authService.getToken()}`
    ).pipe(
      switchMap(()=>{
        return this.recipes
      }),
      take(1),
      tap((recs)=>{
      this._recipe.next(recs.filter((r)=>r.id !== id))
    })
    )
  }

}
