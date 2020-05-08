import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroceryGridComponent} from "./grocery-grid/grocery-grid.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {SignInComponent} from "./sign-in/sign-in.component";


const routes: Routes = [
  { path: 'first-component', component: GroceryGridComponent },
  { path: '',   redirectTo: '/first-component', pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'log-in', component: SignInComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
