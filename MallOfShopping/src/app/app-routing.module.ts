import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroceryGridComponent} from "./grocery-grid/grocery-grid.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {OrderConfirmationWizardComponent} from "./order-confirmation-wizard/order-confirmation-wizard.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {AddGroceriesComponent} from "./add-groceries/add-groceries.component";
import {OrderHistoryMainPageComponent} from "./order-view-main-page/order-history-main-page.component";
import {UserDetailsMainPageComponent} from "./user-details-main-page/user-details-main-page.component";


const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'grocery-list', component: GroceryGridComponent },
  { path: '',   redirectTo: '/grocery-list', pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsMainPageComponent },
  { path: 'order-history', component: OrderHistoryMainPageComponent },
  { path: 'log-in', component: SignInComponent },
  { path: 'order-confirmation', component: OrderConfirmationWizardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
