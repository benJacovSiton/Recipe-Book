import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {

  subscription : Subscription ;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;
  @ViewChild('f')slForm : NgForm;

  constructor(private shoppingListService : ShoppingListService){}


  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
    (index : number) =>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name : this.editedItem.name ,
        amount : this.editedItem.amount
      })
    });
  }

  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name , value.amount)
    if(this.editMode)
      this.shoppingListService.updatetIngredient(this.editedItemIndex ,newIngredient);
    else
      this.shoppingListService.AddIngredient(newIngredient);
    this.editMode  = false;
    form.reset();
   }

   onClear(){
    this.slForm.reset();
    this.editMode = false;
   }

   onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}

/*
   מאפיין שמייצג את ההאזנה לקושר המידע מהסרוויס
    subscription : Subscription; 
    מאפיין המייצג האם אנחנו במצב עריכה
    editMode = false;
    מאפיין המייצג את האינדקס של הרכיב שנבחר לעריכה
    editedItemIndex : number;
    מאפיין המייצג את הרכיב שנבחר לעריכה
    editedItem : Ingredient;
    מאפיין שמייצג את האובייקט טופס -NgForm- 
    מועבר באמצעות הפנייה לוקאלית
    @ViewChild('f')slForm : NgForm;
*/

/*
    שלב האתחול של הקומפוננט
    ngOnInit(){
    נרשם כמנוי לקושר המידע מהסרוויס
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
    (index : number) =>{ פעולה אנונימית שמופעלת במידה ויש עדכון למנוי
      this.editMode = true; אם יש רעש בהאזנה למנוי נשנה שאנחנו במצב עריכה
      this.editedItemIndex = index; נאחסן את האינדקס של הרכיב לשינוי במאפיין
      this.editedItem = this.shoppingListService.getIngredient(index); הרכיב לשינוי
      this.slForm.setValue({ // המטרה היא להציג את המידע עבור הרכיב שנבחר
        name : this.editedItem.name ,
        amount : this.editedItem.amount
      })
    });
  }
*/

/*
  הטופס עצמו - האובייקט 
  שם הפעולה שונה כי היא לא רק מוסיפה מרכיב חדש היא גם עורכת אותו 
  addIngredient(form : NgForm){ || onSubmit(form : NgForm){ 
    const value = form.value; שמירת הערכים של האובייקט טופס בתוך משתנה 
    const newIngredient = new Ingredient(value.name , value.amount) גישה ושמירה
     if(this.editMode) אם אנחנו במצב עריכה נעדכן את ערכו של המרכיב שנבחר
      this.shoppingListService.updatetIngredient(this.editedItemIndex ,newIngredient);
    else אם לא מצב עריכה פשוט נוסיף אותו אל רשימת המרכיבים כמרכיב חדש
      this.shoppingListService.AddIngredient(newIngredient);
    this.editMode = false; שינוי חזרה למצב התחלתי-להוסיף כי מרכיב עדיין לא נבחר
    form.reset(); מעדכן את תצוגת הטופס
   }
*/

/*
  הפעולה מנקה את הקלט בשנמצא בתוך הקונטרולים
   onClear(){
    this.slForm.reset(); // מנקה את תיבות הקונטרולים
    this.editMode = false; // מוודא להחזיר אותו למצב ההתחלתי 
   }
*/

/*
   הפעולה מעבירה את המידע על אודות המרכיב המיועד למחיקה לסרוויס 
   onDelete(){
    מעבירה לסרוויס את האינדקס של המרכיב שנבחר והוקלקל למחיקה
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    מרוקן את תיבות הקלט 
    this.onClear();
   }
*/

/*
    שלב ההריסה של הקומפוננט
    ngOnDestroy() {
    מחיקת המנוי - ההאזנה כדי למנוע דליפות מידע 
    this.subscription.unsubscribe();
  }
*/
