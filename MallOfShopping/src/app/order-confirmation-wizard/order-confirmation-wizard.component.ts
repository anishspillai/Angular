import {Component, OnInit, ViewEncapsulation} from '@angular/core';
//import {MenuItem, MessageService} from "primeng";
import {ConfirmationService, MenuItem} from "primeng/api";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {User} from "firebase";
import {GroceryService} from "../grocery-grid/grocery.service";
import {UserDetailsService} from "../user-details/user.details.service";
import {ErrorLogService} from "../error-log.service";
import {GroceryCountService} from "../grocery-count.service";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
  selector: 'app-order-confirmation-wizard',
  templateUrl: './order-confirmation-wizard.component.html',
  providers: [ConfirmationService, ErrorLogService],
  styleUrls: ['./order-confirmation-wizard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderConfirmationWizardComponent implements OnInit{

  items: MenuItem[];

  displayThankYouDialog: boolean = false

  displayErrorDialog: boolean = false

  displayAddressMissingDialog: boolean = false

  totalCost


  constructor(private confirmationService: ConfirmationService,
              private readonly router: Router,
              readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly groceryService: GroceryService,
              private readonly  userDetailsService: UserDetailsService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly errorLogService: ErrorLogService,
              private readonly groceryCountService: GroceryCountService,
              private  readonly firestore: AngularFireDatabase
              ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.totalCost = params.get("totalCost")
    })
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

    let addressMissing: boolean = false

    const user: User = JSON.parse(localStorage.getItem('user'))

    this.userDetailsService.getUserDetails(user.uid).subscribe(value => {

      if (!value || value.length == 0) {
        this.displayAddressMissingDialog = true
        addressMissing = true
      }

      if(!addressMissing) {
        this.groceryService.placeOrderForTheUser(this.addGroceryToListObservableService.orders, user.uid).then(() => {
          //this.displayThankYouDialog = true
          this.updateCountOfGroceries()
        })
          .catch(err => {
            this.displayErrorDialog = true
            this.errorLogService.logErrorMessage(user.uid, err)
          });
      }
    })

  }

  private updateCountOfGroceries() {

    this.addGroceryToListObservableService.orders.forEach(grocery => {
        const groceryCountModel = this.groceryCountService.getGroceryCountModel(grocery.id)
        if (groceryCountModel) {
            const countOfGrocery = groceryCountModel.count - grocery.noOfItems
            const  list = this.firestore.list('stock_count/')
            list.set(grocery.id, countOfGrocery).catch(reason => console.log(reason));
        }
      }
    )

    this.displayThankYouDialog = true
  }

  navigateToTheMainPage() {
    localStorage.setItem('foo', 'no reload')
    this.router.navigate(['grocery-list']);
  }
}
