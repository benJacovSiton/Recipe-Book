import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{

  // הקישור בין שינוי המידע בקומפוננטות מבחינת רשימת המרכיבים
  ingredientsChanged = new Subject<Ingredient[]>();

  // מחזיק את האינדקס של הרכיב מהמתכון אותו נערוך
  // ויקשר אותו לקומפוננט אחרת המטפלת בזה
  startedEditing = new Subject<number>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
      ];

      // על כל מרכיב חדש שנוסיף לרשימה יפלט גם המידע 
      AddIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updatetIngredient(index : number , newtIngredient : Ingredient){
        this.ingredients[index] = newtIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index : number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      
      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index : number){
        return this.ingredients[index];
      }

     
}

/* מחזיק את האינדקס של המרכיב מהמתכון אותו נערוך
   ויקשר אותו לקומפוננט אחרת המטפלת בזה
  startedEditing = new Subject<number>();
*/

/*
    מטרת הפעולה היא לעדכן את פרטיו של מרכיב נבחר
    היא מקבלת את האינדקס של אותו מרכיב נבחר ואת פרטיו החדשים
    updatetIngredient(index : number , newtIngredient : Ingredient){
        this.ingredients[index] = newtIngredient; בעריכה - נדרוס את קודמו
        חדש נוסיף למערך שכל שאר הקומפוננטות מנויות לשינויים בו 
        this.ingredientsChanged.next(this.ingredients.slice()); 
      }
*/

/*      תפקידה של הפעולה היא למחוק מרכיב מרשימת המרכיבים
        deleteIngredient(index : number){
          מוחקת את הערך היחידי באינדקס
          this.ingredients.splice(index,1);
          מעדכן את המערך למערך שכל שאר הקומפוננטות מנויות לשינויים בו
          this.ingredientsChanged.next(this.ingredients.slice());
      }
*/

/*
  פעולה שמטרתה להחזיר את המרכיב שנבחר לעריכה מרשימת המרכיבים
   getIngredient(index : number){
        return this.ingredients[index];
      }
*/