import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number;
  editMode = false;
  recipeForm : FormGroup;
  

  constructor(private route : ActivatedRoute , 
              private recipeService : RecipeService , 
              private router : Router){}

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRicpe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup ({
              'name' : new FormControl(ingredient.name
                ,Validators.required) ,
              'amount' : new FormControl(ingredient.amount
                ,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName ,Validators.required) ,
      'imagePath' : new FormControl(recipeImagePath ,Validators.required) ,
      'description' : new FormControl(recipeDescription ,Validators.required),
      'ingredients' : recipeIngredients
    });

  }

  onSubmit(){
     if(this.editMode)
      this.recipeService.updateRecipe(this.id , this.recipeForm.value);
    else
      this.recipeService.addRecipe(this.recipeForm.value);
    this.router.navigate(['../'] , {relativeTo : this.route})
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup ({
        'name' : new FormControl(null , Validators.required) ,
        'amount' : new FormControl(null ,
           [Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
    
  }

 onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
 }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}

/* 
  private recipeService : RecipeService
  בקונסקטור נזריק את הסרוויס כדי לקבל גישה למידע ולפעולות ההכרחיות כדי לערוך את המתכונים
  private router : Router
  הזרקה של יכולות ניווט למען העברת המשתמש בין הדפים אחרי ביצוע פעולות
*/

/*
   ngOnInit() {
    this.route.params.subscribe(
      (params : Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
  בשלב האתחול של הקומפוננט נרצה לקרוא לפעולה שמאתחלת את הטופס אבל בעת שהמנוי המאזין לשינויים בנתיב מופעל
  כך בוודאות נדע שאנחנו במצב עריכה על מתכון מסויים
*/

/*
   recipeForm : FormGroup;
   מאפיין בקומפוננט שהוא האובייקט של הטופס
*/

/*
    הפעולה עם אקסס מודייפר פרטי כי הוא בלעדי לקומפונטט הזו 
    private initForm(){
    
    מאפיינים גלובלים לפעולה
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    בדיקה ואכן אנחנו במצב עריכה - יתכן כי היא תקרא ממקומות אחרים שאינם ביצעו את הבדיקה 
    if(this.editMode){
      משתנה המכיל את אותו המתכון שנערך 
      const recipe = this.recipeService.getRicpe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      בדיקה האם המערך אינו ריק - מכיל מרכיבים
       if(recipe['ingredients']){
        הלולאה רצה על המרכיבים הקיימים במתכון
        for(let ingredient of recipe.ingredients){
          עבור כל מרכיב ברשימת נדחוף אותו למערך של הטופס
          recipeIngredients.push(
            כל מרכיב מורכב משני קונטרולים שם וכמות המרכיב
            לכן הם נחשבים כקבוצה של הטופס
            הקונטרולים נדרשים וחלה הגבלה נוספת על כמות אינה יכולה להיות שלילית
            new FormGroup ({
              'name' : new FormControl(ingredient.name
                ,Validators.required) ,
              'amount' : new FormControl(ingredient.amount
                ,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }
     יצירת אובייקט הטופס שמכיל בתוכו את כל הקונטרולים
    המקבלים לתצוגה את הערכים הנוכחים במתכון
    הקונטרולים האלה נדרשים כלומר אין אפשרות לשלוח את הטופס בלעדיהן
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName ,Validators.required) ,
      'imagePath' : new FormControl(recipeImagePath ,Validators.required) ,
      'description' : new FormControl(recipeDescription ,Validators.required),
      'ingredients' : recipeIngredients
    });

  }
  
*/

/*
  מאפשר גישה ללואה בתבנית אל קבוצת הקונטרולים
  דבר זה נדרש בגרסאות המתקדמות של אנגולר
    get controls() { 
    הפעולה מחזירה את המערך שממומר לטיפוס מערך בטופס ואז כקונטרול
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
*/


/*
  תפקידה של הפעולה היא לייצר קלט עבור מרכיבי המתכון
    onAddIngredient(){
    פה אנחנו עושים קאסטינג למערך הטופס - אנגולר צריך לדעת בוודאות את הטיפוס
    ודוחפים קבוצה חדשה של קונטרולים אליו
    שמאותחלים כריקים עבור קלט עתידי של המשתמש
    הקונטרולים האלה נדרשים ועל הכמות חלה הגבלה נוספת שאינה יכולה להיות שלילית
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup ({
        'name' : new FormControl(null , Validators.required) ,
        'amount' : new FormControl(null ,
           [Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
*/

/*
  onSubmit(){

    בעת שליחת הטופס תתבצע בדיקה ופנייה לפעולה המתאימה 
       if(this.editMode)
      this.recipeService.updateRecipe(this.id , this.recipeForm.value);
    else
      this.recipeService.addRecipe(this.recipeForm.value);
    ניווט המשתמש אל הדף הקודם לאחר ביצוע שמירת השינויים
    this.router.navigate(['../'] , {relativeTo : this.route})

    גישה שנייה לפרק את כל הקונטרולים למשתנים ואז לשלוח אותם במשתנה לפעולה
    // const newRecipe = new Recipe(this.recipeForm.value['name'] ,
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']);
    // if(this.editMode)
    //   this.recipeService.updateRecipe(this.id , newRecipe);
    // else
    //  this.recipeService.addRecipe(newRecipe);
  }
*/

/*
מוחק את המרכיב/את הוספת המרכיב ממתכון מסויים
מקבל את האינדקס של המרכיב בתוך המתכון ומסיר אותו מהרשימה 
 onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
 }
*/

/*

*/

/*

*/



