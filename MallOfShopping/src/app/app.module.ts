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
import { UserDetailsComponent } from './user-details/user-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AccordionModule} from "primeng/accordion";
import {InputTextareaModule} from "primeng/inputtextarea";
import { SignInComponent } from './sign-in/sign-in.component';
import {PasswordModule} from "primeng/password";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import {NavigatorService} from "./navigator/navigator.service";
import {GroceryService} from "./grocery-grid/grocery.service";
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BreadCrumbService} from "./bread-crumb/bread-crumb.service";
import {MessagesModule} from "primeng/messages";
import { ReviewOrderedItemsComponent } from './review-ordered-items/review-ordered-items.component';
import { OrderConfirmationWizardComponent } from './order-confirmation-wizard/order-confirmation-wizard.component';
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps"
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { EditUserComponent } from './edit-user/edit-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddGroceriesComponent } from './add-groceries/add-groceries.component';
import { NavigatorForMobileDeviceComponent } from './navigator-for-mobile-device/navigator-for-mobile-device.component';
import {MenuModule} from "primeng/menu";
import { OrderHistoryMainPageComponent } from './order-view-main-page/order-history-main-page.component';
import { UserDetailsMainPageComponent } from './user-details-main-page/user-details-main-page.component';
import { DisplayMessageComponent } from './display-message/display-message.component';
import { PrivatePoliciesComponent } from './private-policies/private-policies.component';
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import { FishViewButtonComponent } from './fish-view-button/fish-view-button.component';
import { FishMarketVideoViewComponent } from './fish-market-video-view/fish-market-video-view.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { TimePickerComponent } from './time-picker/time-picker.component';
import {CalendarModule} from "primeng/calendar";
import { PaymentOptionViewComponent } from './payment-option-view/payment-option-view.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SlideMenuModule} from "primeng/slidemenu";
import {MultiSelectModule} from "primeng/multiselect";
import {ProductCarouselComponent} from "./product-carousel/product-carousel.component";
import {CarouselModule} from "primeng/carousel";
import { FooterComponent } from './footer/footer.component';

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
    SignInComponent,
    BreadCrumbComponent,
    ReviewOrderedItemsComponent,
    OrderConfirmationWizardComponent,
    EditUserComponent,
    LandingPageComponent,
    AddGroceriesComponent,
    NavigatorForMobileDeviceComponent,
    OrderHistoryMainPageComponent,
    UserDetailsMainPageComponent,
    DisplayMessageComponent,
    PrivatePoliciesComponent,
    FishViewButtonComponent,
    FishMarketVideoViewComponent,
    TimePickerComponent,
    PaymentOptionViewComponent,
    ProductCarouselComponent,
    FooterComponent
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
        AccordionModule,
        InputTextareaModule,
        PasswordModule,
        ReactiveFormsModule,
        TableModule,
        ProgressSpinnerModule,
        MessagesModule,
        ToastModule,
        StepsModule,
        ConfirmDialogModule,
        MenuModule,
        CheckboxModule,
        DropdownModule,
        FontAwesomeModule,
        CalendarModule,
        HttpClientModule,
        SlideMenuModule,
        MultiSelectModule,
        CarouselModule,

    ],
  providers: [AngularFireDatabase, NavigatorService, GroceryService, BreadCrumbService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
