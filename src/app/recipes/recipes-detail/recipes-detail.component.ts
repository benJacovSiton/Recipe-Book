import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {


  recipe:Recipe;
  id : number;

  constructor(private shoppingListService : ShoppingListService , 
              private recipeService : RecipeService ,
              private route : ActivatedRoute,
              private router : Router){}

  ngOnInit() {
    this.route.params.subscribe(  // הפונקציה מאזינה לשינויים ומעדכנת את ערכו של הזהות שהוא רכיב דינמי בתוך הנתיב
      (params : Params) => {
      this.id = +params['id']; // נתיב מתעסק עם מחרוזות לכן אנחנו עושים לו המרה למספר כהטיפוס של המאפיין אליו הוא נכנס
      this.recipe = this.recipeService.getRicpe(this.id); // המתכון שנבחר מתקבל מהסרוויס על ידי האיידי שמתקבל מתוך הנתיב שמתקבל ממתכון יחיד 
    }
    );
  }
  
 // רץ בלולאה על כל המרכיבים של המתכון ומוסיף אותם לרשימה
  addToIngredients() {
    for (const ingredient of this.recipe.ingredients) {
      this.shoppingListService.AddIngredient(new Ingredient(ingredient.name, ingredient.amount));
    }

  }

  onEditRecipe(){
    this.router.navigate(['edit'] , {relativeTo : this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  
  

}
