import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
    new Recipe(
        'Tasty Schnitzel',
        'A super-tasty Schnitzel - just awesome!',
    // tslint:disable-next-line:max-line-length
        'https://www.recipetineats.com/wp-content/uploads/2017/08/Schnitzel-3-landscape.jpg',
        [
           new Ingredient('Meat', 1),
           new Ingredient('French Fries', 20)
        ]),
    new Recipe(
        'Big Fat Burger',
        'What else to say? King-size!',
        // tslint:disable-next-line:max-line-length
        'http://www.munchkintime.com/wp-content/uploads/2017/06/Best-Hamburger-Recipe-to-make-for-Fathers-Day-from-Munchkintime.com-46.jpg',
        [
           new Ingredient('Buns', 2),
           new Ingredient('Meat', 1)
        ])
  ];

  constructor(private slService: ShoppingListService ) {}

  getRecipes() {
      return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
