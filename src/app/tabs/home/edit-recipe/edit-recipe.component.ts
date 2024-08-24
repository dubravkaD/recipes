import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent  implements OnInit {

  public editForm: FormGroup

  @Input() title:string =""

  // @Input() recipeOld:Recipe ={id:"1",authorId:"1",ingredients:"",instructions:"",category:"breakfast",title:"Title1",createdAt:new Date(),updatedAt:new Date()}
  constructor(private mdlCtrl: ModalController, public formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      rTitle: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      instructions: new FormControl('', Validators.required)
    })
    // console.log(this.recipeOld)
    console.log(this.title)
  }

  ngOnInit() {}

  close(){
    this.mdlCtrl.dismiss(null,'cancel');
  }
  save(){
    if(this.editForm.valid){
      this.mdlCtrl.dismiss(
        {
          recipe:
            {
              category: this.editForm.controls['category'].value,
              ingredients: this.editForm.controls['ingredients'].value,
              instructions: this.editForm.controls['instructions'].value,
              title:this.editForm.controls['rTitle'].value
            }
        }
        , 'add');
    }
  }

  getValidForm(){
    return this.editForm.invalid
  }
}
