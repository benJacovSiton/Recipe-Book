import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn : 'root'})
export class DataStorageService{

    constructor(private http : HttpClient , private recipeService : RecipeService ,
                private authService : AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put(
            'https://recipe-book-2ce87-default-rtdb.firebaseio.com/recipes.json',
            {}
             ).subscribe( response => {
                console.log(response);
             });
    }

    fetchRecipes() {
      return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
          return this.http.get<Recipe[]>('https://recipe-book-2ce87-default-rtdb.firebaseio.com/recipes.json');
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
    }
    
}

/*
     storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put(
            'https://recipe-book-2ce87-default-rtdb.firebaseio.com/recipes.json'
             , recipes
             ).subscribe( response => {
                console.log(response);
             });
    }
    הפעולה אחראית על יצירת בקשת הכנסת מידע אל השרת 
    היא מקבלת מהסרוויס האחראי על המתכונים את מערך המתכונים הנוכחי ושומרת אותו במשתנה
   -שים לב שהוא מקבל את הטיפוס שלו כמערך מהערך החוזר שלו-
   הפעולה שים היא פעולה המקבלת שתי ארגומנטים הנתיב אליו היא אמורה להכניס את המידע 
   והמידע אותו היא אמורה להכניס
   מכיוון שמדובר פעולה שניתנת לצפייה ולא חייבת להתרחש -תלוי במשתמש-אנחנו חייבים להירשם כמנוי 
   -אין מנוי אין בקשה-
   בגלל שהערך המוחזר - התגובה - אינה מעניינת את הקומפוננט המנוי יתבצע כאן
   -הוכחה קונסול לוג -
*/

/*
     fetchRecipes(){
         return this.http.get<Recipe[]>('https://recipe-book-2ce87-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes =>{
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                  });
                }),
                tap(recipes => {
                  this.recipeService.setRecipes(recipes);
                })
              );   
    }
    הפעולה אחראית על יצירת בקשה השגת המידע מהשרת
    היא מקבלת כארגומנט כתובת שממנה היא אמורה להשיב את המידע 
    פעולת גט היא פעולה גינרית ובין התגיות אנחנו מגדירים את הטיפוס של הערך המוחזר
    באמצעות פייפ המקבלת כארגומנט את הפעולה מאפ אנחנו סורקים את כל המתכונים החוזרים מהשרת
    באמצעות מאפ השני שאנחנו מפעילים על כל אחד מהמתכונים שחזרו מהשרת אנחנו מבצעים בדיקה האם הוא מכיל מרכיבים
    אם הוא אינו מכיל מרכיבים אנחנו מוסיפים אותם כמערך ריק כדי להימנע משגיאות עתידיות
    לאחר מכן אנחנו מאחזרים את המידע אל תוך הטאפ שהוא אופרטור מארקגס המאפשר לנו לבצע קוד
    מבלי לשנות את המידע שנשפך פנימה מאותו הניתן לצפייה שמאוחזר פנימה
*/

