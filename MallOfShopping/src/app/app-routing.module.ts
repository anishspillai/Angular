import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroceryGridComponent} from "./grocery-grid/grocery-grid.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {OrderConfirmationWizardComponent} from "./order-confirmation-wizard/order-confirmation-wizard.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {OrderHistoryMainPageComponent} from "./order-view-main-page/order-history-main-page.component";
import {UserDetailsMainPageComponent} from "./user-details-main-page/user-details-main-page.component";
import {ProductCarouselComponent} from "./product-carousel/product-carousel.component";
import {NewProductsListComponent} from "./new-products-list/new-products-list.component";
import {OfferPageComponent} from "./offer-page/offer-page.component";


const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'grocery-list', component: GroceryGridComponent },
  { path: '',   redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsMainPageComponent },
  { path: 'order-history', component: OrderHistoryMainPageComponent },
  { path: 'log-in', component: SignInComponent },
  { path: 'order-confirmation', component: OrderConfirmationWizardComponent },
  { path: 'home-page', component: ProductCarouselComponent },
  { path: 'new-items-list', component: NewProductsListComponent },
  { path: 'offer-page', component: OfferPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
