import {Component, OnInit, ViewEncapsulation} from '@angular/core';
//import {MenuItem, MessageService} from "primeng";
import {ConfirmationService, MenuItem} from "primeng/api";
import {MessageService} from "primeng/api";
import {Route, Router} from "@angular/router";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {User} from "firebase";
import {GroceryService} from "../grocery-grid/grocery.service";
import {UserDetailsService} from "../user-details/user.details.service";

@Component({
  selector: 'app-order-confirmation-wizard',
  templateUrl: './order-confirmation-wizard.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./order-confirmation-wizard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderConfirmationWizardComponent {

  items: MenuItem[];

  displayThankYouDialog: boolean = false

  displayErrorDialog: boolean = false

  displayAddressMissingDialog: boolean = false


  constructor(private confirmationService: ConfirmationService,
              private readonly router: Router,
              readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly groceryService: GroceryService,
              private readonly  userDetailsService: UserDetailsService) {
  }

  cancelThisPage() {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel placing this order?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.setItem('foo', 'no reload')
        this.router.navigate(['grocery-list']);
      },
      reject: () => {

      }
    });

    //localStorage.setItem('foo', 'no reload')
    //this.router.navigate(['first-component']);
  }

  placeOrder() {

    const user: User = JSON.parse(localStorage.getItem('user'))

    this.userDetailsService.getUserDetails(user.uid).subscribe(value => {

      if (!value || value.length == 0) {
        this.displayAddressMissingDialog = true
        return
      } else {
        this.groceryService.placeOrderForTheUser(this.addGroceryToListObservableService.orders, user.uid).then(() => {
          this.displayErrorDialog = true
        })
          .catch(err => {
            this.displayErrorDialog = true
          });
      }
    })

  }

  navigateToTheMainPage() {
    localStorage.setItem('foo', 'no reload')
    this.router.navigate(['grocery-list']);
  }
}
