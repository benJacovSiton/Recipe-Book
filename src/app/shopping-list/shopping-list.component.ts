import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy {

  ingredients : Ingredient[];
  private igChangeSub : Subscription;
  constructor(private shoppingListService : ShoppingListService){}

  
  // מאזין לשינויים ומאתחל מחדש את רשימת המרכיבים המעודכנת 
  ngOnInit() { 
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      });
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index : number){
    this.shoppingListService.startedEditing.next(index);
  }
}

/*  אירוע לחיצה על רכיב נבחר מהמתכון
    onEditItem(index : number){  מתקבל האינדקס שלו 
      
    מעבירים לפולט האירועים את האינדקס של הרכיב הנבחר מהמתכון 
    הוא יאחוז בתוכו את האינדקס ויקשר אותו לאותו רכיב הנבחר מהמתכון במערך 
    שקיים בסרוויס כך שהוא יהיה זמין עבור קומפוננט אחרת - עריכת קניות 
    שמטרתה היא לערוך את רשימת הקניות עבור המתכון
    this.shoppingListService.startedEditing.next(index);
  }

*/
