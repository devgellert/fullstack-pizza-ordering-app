import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from '../../services/ingredient'
import { IngredientCreatorComponent } from '../ingredient-creator/ingredient-creator.component';
import { IngredientDeleterComponent } from '../ingredient-deleter/ingredient-deleter.component';
import { IngredientEditorComponent } from '../ingredient-editor/ingredient-editor.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ingredients?: Ingredient[];

  constructor(
    private ingredientService: IngredientService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  async ngOnInit(

  ): Promise<void> {
    this.ingredients = await this.ingredientService.getIngredients();
  }

  async onEditIngredient(ingredient: Ingredient){//ingredient
    console.log(ingredient)
    const dialogRef = this.dialog.open(IngredientEditorComponent,{
      width: '500px',
      data: ingredient,
    });
    const resIngredient = await dialogRef.afterClosed().toPromise();
    console.log(resIngredient)
    const newIngredient = await this.ingredientService.editIngredient(resIngredient, ingredient.id);
    this.ingredients = await this.ingredientService.getIngredients();

  }

  async onCreateIngredient(){
    const dialogRef = this.dialog.open(IngredientCreatorComponent,{
      width: '500px',
      //data: id,
    });
    const result = await dialogRef.afterClosed().toPromise();
    const newIngredient = await this.ingredientService.createIngredient(result);
    if(newIngredient){
      this.ingredients!.push(newIngredient);
    }

  }

  async onDeleteIngredient(ingredient: Ingredient){//ingredient or id
    await this.ingredientService.deleteIngredient(ingredient.id);
    this.ingredients?.splice(this.ingredients.indexOf(ingredient),1);
    this.ingredients = await this.ingredientService.getIngredients();
  }
}
