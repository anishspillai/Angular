import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonModule} from "primeng/button";

import {AngularFireModule} from "@angular/fire";
import {environment} from '../environments/environment';
import {AngularFireDatabase} from "@angular/fire/database";
import {IndividualGroceryComponent} from "./individual-grocery/individual-grocery-component";
import {HeaderComponent} from "./header/header.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SplitButtonModule} from "primeng/splitbutton";
import {DialogModule} from "primeng/dialog";
import {SidebarModule} from "primeng/sidebar";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {ListboxModule} from "primeng/listbox";
import {BreadcrumbModule} from "primeng/breadcrumb"
import {GroceryGridComponent} from "./grocery-grid/grocery-grid.component";
import {NavigatorComponent} from "./navigator/navigator.component";
import {RouterModule, Routes} from "@angular/router";
import { UserDetailsComponent } from './user-details/user-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AccordionModule} from "primeng/accordion";
import { TestHeaderComponent } from './test-header/test-header.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import { SignInComponent } from './sign-in/sign-in.component';
import {PasswordModule} from "primeng/password";
import { RegisterComponent } from './register/register.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import {NavigatorService} from "./navigator/navigator.service";
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import {GroceryService} from "./grocery-grid/grocery.service";
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BreadCrumbService} from "./bread-crumb/bread-crumb.service";
import {MessagesModule} from "primeng/messages";
import { ReviewOrderedItemsComponent } from './review-ordered-items/review-ordered-items.component';

const routes: Routes = [
  { path: 'first-component', component: GroceryGridComponent },
  { path: 'user-details', component: UserDetailsComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    IndividualGroceryComponent,
    HeaderComponent,
    GroceryGridComponent,
    NavigatorComponent,
    UserDetailsComponent,
    OrderHistoryComponent,
    PageNotFoundComponent,
    TestHeaderComponent,
    SignInComponent,
    RegisterComponent,
    BreadCrumbComponent,
    NavigationItemComponent,
    ReviewOrderedItemsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PanelModule,
        BrowserAnimationsModule,
        ButtonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        InputTextModule,
        FormsModule,
        SplitButtonModule,
        DialogModule,
        SidebarModule,
        CardModule,
        ToolbarModule,
        ListboxModule,
        BreadcrumbModule,
        AppRoutingModule,
        RouterModule.forRoot(
            routes
            //,{enableTracing: true} // <-- debugging purposes only
        ),
        AccordionModule,
        InputTextareaModule,
        PasswordModule,
        ReactiveFormsModule,
        TableModule,
        ProgressSpinnerModule,
        MessagesModule

    ],
  providers: [AngularFireDatabase, NavigatorService, GroceryService, BreadCrumbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
