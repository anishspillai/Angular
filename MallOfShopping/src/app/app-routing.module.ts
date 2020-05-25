import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroceryGridComponent} from "./grocery-grid/grocery-grid.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {OrderConfirmationWizardComponent} from "./order-confirmation-wizard/order-confirmation-wizard.component";


const routes: Routes = [
  { path: 'grocery-list', component: GroceryGridComponent },
  { path: '',   redirectTo: '/grocery-list', pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'log-in', component: SignInComponent },
  { path: 'order-confirmation', component: OrderConfirmationWizardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
