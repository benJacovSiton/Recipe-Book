import { Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit , OnDestroy {
  
  recipes: Recipe[] ;
  subscription : Subscription;
  constructor(private recipeService : RecipeService , private router:Router , private route : ActivatedRoute){}
 
  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  } 

  onNewRecipe(){
    this.router.navigate(['new'] , {relativeTo : this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

/*
באתחול הקומפוננוט אנחנו רוצים לגשת ולהציג את רשימת המתכונים הזמינה
  ngOnInit() {
מנוי לשינויים - כלומר אם מתבצע שינוי אנחנו מאתחלים את הקומפוננט
ומעדכנים באמצעות האזנה למאגר המידע המשותף בהאזנה מהסרוויס
   ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  } 
אם לא בוצע שינוי ויתכן שלא בוצע שינוי כי הוא מנוי לניתן לצפייה
נעדכן את המערך במערך הקיים מתוך הסרוויס
    this.recipes = this.recipeService.getRecipes();
  } 

    נשמור את המנוי במשתנה על מנת לסגור אותו בסוף שלא תהיה דילפת מידע
    ngOnDestroy(){
    this.subscription.unsubscribe();
  }

*/
