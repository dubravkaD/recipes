import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-element',
  templateUrl: './recipe-element.component.html',
  styleUrls: ['./recipe-element.component.scss'],
})
export class RecipeElementComponent  implements OnInit {

  @Input() recipe:Recipe = {id:"1",authorId:"1",ingredients:"",instructions:"",category:"lunch",title:"Title 1",createdAt:new Date(),updatedAt:new Date()}

  constructor() { }

  ngOnInit() {}

}
