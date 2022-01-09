import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient } from '../../services/ingredient';

@Component({
  selector: 'app-ingredient-editor',
  templateUrl: './ingredient-editor.component.html',
  styleUrls: ['./ingredient-editor.component.css']
})
export class IngredientEditorComponent implements OnInit {

  ingredientForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  get name(): FormControl{
    return this.ingredientForm.get('name') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IngredientEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private ingredient: Ingredient
  ) {
    if (this.ingredient) {
      this.ingredientForm.reset(this.ingredient);
    }
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.ingredientForm.valid) {
      return;
    }

    this.dialogRef.close(this.ingredientForm.value as Ingredient);
  }

}
