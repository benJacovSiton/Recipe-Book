
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";

export class RecipeService{

   // יוצר קישור של העברת מידע באירועים בין קומפוננטות
    recipeSelected = new Subject<Recipe>();

    // מכיוון שאנחנו שולחים העתק של המערך אנחנו צריכים להוציא מאפיין משותף
    // שמקשיב לשינויים והופך להיות המאגר הנגיש עבור רשימת המתכונים המעודכנת
    recipesChanged = new Subject<Recipe[]>();

     private recipes: Recipe[];

     setRecipes(recipes : Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
     }

     getRecipes(){
        return this.recipes.slice();
     }

     getRicpe(index : number){
      return this.recipes[index];
    }

    addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index : number , newRecipe : Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index : number){
      this.recipes.splice(index ,1);
      this.recipesChanged.next(this.recipes.slice());
    }
}

/*
    setRecipes(recipes : Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
     }
     תפקיד הפעולה היא לדרוס את המידע הסטטי - המידע התחלתי שקיים בסרוויס
     הוא מקבל מערך חדש דנשנש מתוך הסרוויס המטפל בבקשות ה Http 
     בגוף הפעולה יש עדכון למערך הראשי שמכיל את כל המתכונים ומקבל עדכון מהשרת recipes
     ואת המערך שניזון ממנו מאזין לשינויים אצלו ומפיץ את המידע בו לקומפוננטות recipesChanged
*/




/*
     מכיוון שאנחנו שולחים העתק של המערך אנחנו צריכים להוציא מאפיין משותף
     שמקשיב לשינויים והופך להיות המאגר הנגיש עבור רשימת המתכונים המעודכנת
    recipesChanged = new Subject<Recipe[]>();
*/

/*
  תפקיד הפעולה היא להוסיף מתכון חדש אל רשימת המתכונים
     addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
*/

/*
    תפקיד הפעולה היא לעדכן את המתכון באינדקס מסויים
      updateRecipe(index : number , newRecipe : Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
*/

/*
    תפקיד הפעולה היא למחוק מתכון באינדקס מסויים
      deleteRecipe(index : number){
      this.recipes.splice(index ,1);
      this.recipesChanged.next(this.recipes.slice());
    }
*/



    // private recipes: Recipe[] = [
    //   new Recipe(
    //     'Tasty Schnitzel',
    //     'A super-tasty Schnitzel - just awesome!',
    //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //     [
    //       new Ingredient('Meat', 1),
    //       new Ingredient('French Fries', 20)
    //     ]),
    //   new Recipe('Big Fat Burger',
    //     'What else you need to say?',
    //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //     [
    //       new Ingredient('Buns', 2),
    //       new Ingredient('Meat', 1)
    //     ])
    // ];
