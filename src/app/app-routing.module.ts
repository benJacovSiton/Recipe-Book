import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Routes = [
  {path : '' , redirectTo :'recipes' , pathMatch : 'full'} ,
  {path : 'recipes' , component : RecipesComponent , children : [
    {path : '' , component: RecipeStartComponent } , 
    {path : 'new' , component: RecipeEditComponent } ,
    {path : ':id' , component: RecipesDetailComponent , resolve: [recipesResolverService] } ,
    {path : ':id/edit' , component: RecipeEditComponent , resolve: [recipesResolverService]} ,
  ]} , 
  {path : 'shopping-list' , component : ShoppingListComponent}  ,
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

