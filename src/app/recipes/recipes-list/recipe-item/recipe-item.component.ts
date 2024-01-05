import { Component ,Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

 // המאפיינים מתקבלים מהקומפוננט ההורה שלה רשימת מתכונים 
  @Input() recipe : Recipe;
  @Input() index : number;
  

}
