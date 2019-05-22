import { AuthService } from "./../auth/auth.service";
import { Recipe } from "./../recipes/recipe.model";
import { RecipeService } from "./../recipes/recipe.service";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getIdToken();
    return this.http.put(
      "https://ng-shopping-recipe-book.firebaseio.com/recipes.json?auth=" +
        token,
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    const token = this.authService.getIdToken();

    this.http
      .get<Recipe[]>(
        "https://ng-shopping-recipe-book.firebaseio.com/recipes.json?auth=" +
          token
      )
      .map(recipes => {
        for (let recipe of recipes) {
          if (!recipe["ingredients"]) {
            recipe["ingredients"] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
