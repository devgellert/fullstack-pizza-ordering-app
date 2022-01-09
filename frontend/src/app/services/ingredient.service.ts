import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from './ingredient'

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  static BASE_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  public async getIngredients(): Promise<Ingredient[] | undefined> {
    return (
      this.http.get(IngredientService.BASE_URL+'/api/ingredient') as Observable<Ingredient[]>
    ).toPromise();
  }

  async createIngredient(ingredient: Ingredient): Promise<Ingredient | undefined> {
    const createdIngredient = await (
      this.http.post(IngredientService.BASE_URL+'/api/ingredient/create', ingredient) as Observable<Ingredient>
    ).toPromise();
    return createdIngredient;
  }

  async editIngredient(ingredient: Ingredient, id: number): Promise<Ingredient | undefined> {
    const modifiedIngredient = await (
      this.http.patch(IngredientService.BASE_URL+`/api/ingredient/update/${id}`, ingredient) as Observable<Ingredient>
    ).toPromise();
    return modifiedIngredient;
  }

  async deleteIngredient(id: number): Promise<any> {
    const modifiedIngredient = await (
      this.http.delete(IngredientService.BASE_URL+`/api/ingredient/delete/${id}`)
    ).toPromise();
    return modifiedIngredient;
  }
}
