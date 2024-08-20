import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
})
export class RecipeModalComponent  implements OnInit {

  public addForm: FormGroup;
  @Input() title:string;
  constructor(private mdlCtrl: ModalController, public formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      rTitle: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      instructions: new FormControl('', Validators.required)
    });
    this.title='';
  }

  ngOnInit() {}

  save(){
    if(this.addForm.valid){
      this.mdlCtrl.dismiss(
        {
          recipe:
            {
              category: this.addForm.controls['category'].value,
              ingredients: this.addForm.controls['ingredients'].value,
              instructions: this.addForm.controls['instructions'].value,
              title:this.addForm.controls['rTitle'].value,
              createdAt:new Date(),
              updatedAt:new Date()
            }
        }
        , 'add');
    }
    // console.log(this.addForm)
  }
  close() {
    this.mdlCtrl.dismiss(null,'cancel');
  }
  getValidForm(){
    return this.addForm.invalid
  }
}
