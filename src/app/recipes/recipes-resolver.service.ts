import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class recipesResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService : DataStorageService, 
         private recipeService:RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();

        if(recipes.length === 0)
            //return this.dataStorageService.fetchRecipes();

        return recipes;
    }
}

/*
    ריסולבס הוא למעשה קטע קוד שרץ לפני שהנתיב נטען כדי להבטיח שמידע מסויים שהנתיב תלוי בו נמצא שם
*/

/*
    constructor(private dataStorageService : DataStorageService, 
         private recipeService:RecipeService){}
         הזרקה של פעולות הבקשה Http
         והזרקה של מאגר המידע של המתכונים
*/

/*
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();

        if(recipes.length === 0)
            return this.dataStorageService.fetchRecipes();

        return recipes;
    }
    הפעולה שחייבת להתממש מירושת הממשק של הריסולבר
    מקבלת את הנתיב הנוכחי ואת המצב שלו
    נשמור את רשימת המתכונים הקיימת עכשיו בדף בתוך משתנה
    אם אורך הרשימה שווה לאפס זה אומר שאין מתכונים בהצגה ועלינו להשיג ולהציג אותם לפני טעינת הדף
    ואם יש מתכונים ברשימה נציג את הרשימה המעודכנת
    כי זוכר ריסולבר חייב את המידע שהנתיב תלוי בו
*/

