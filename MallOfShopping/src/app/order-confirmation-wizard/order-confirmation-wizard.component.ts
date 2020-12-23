import {Component, OnInit, Output, ViewEncapsulation} from '@angular/core';
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
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Order} from "../individual-grocery/model/Order";

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

  deliveryDate: Date

  commentsFromCustomer: string
  private isOrderPlaced: boolean;
  orderBeingPlaced = false

  constructor(private confirmationService: ConfirmationService,
              private readonly router: Router,
              readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly groceryService: GroceryService,
              private readonly  userDetailsService: UserDetailsService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly errorLogService: ErrorLogService,
              private readonly groceryCountService: GroceryCountService,
              private  readonly firestore: AngularFireDatabase,
              private readonly authService: AuthService,
              private readonly http: HttpClient
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
        localStorage.setItem('no-reload', 'no reload')
        this.router.navigate(['home-page']);
      },
      reject: () => {

      }
    });

    //localStorage.setItem('foo', 'no reload')
    //this.router.navigate(['first-component']);
  }

  placeOrder() {

    let addressMissing: boolean = false

    const user: string = localStorage.getItem('application_Id')

    this.userDetailsService.getUserDetails(user).subscribe(value => {

      if (!value || value.length == 0) {
        this.displayAddressMissingDialog = true
        addressMissing = true
      }

      if(!addressMissing) {
        this.orderBeingPlaced = true
        const orderTimestamp = new Date().getTime()
        this.isOrderPlaced = false
        this.groceryService.placeOrderForTheUser(this.addGroceryToListObservableService.orders, user, orderTimestamp).then(() => {
          this.displayThankYouDialog = true
          this.isOrderPlaced = true
          this.orderBeingPlaced = false
          //this.updateCountOfGroceries()
          this.emptyShoppingCart()
          this.addDeliveryStatus(orderTimestamp, user)
          //this.sendOrderAcknowledgementMail()
          this.emptyShoppingCart()
        })
          .catch(err => {
            this.orderBeingPlaced = false
            if(!this.isOrderPlaced) {
              this.displayErrorDialog = true
            }
            this.errorLogService.logErrorMessage(user, err)
          });
      }
    })

  }

  getOrders() : Order[]  {
    return this.addGroceryToListObservableService.orders
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

    //this.displayThankYouDialog = true
  }

  navigateToTheMainPage() {
    localStorage.setItem('no-reload', 'no reload')
    this.router.navigate(['home-page']);
  }

  private addDeliveryStatus(orderTimestamp: number, user: string) {
    const deliveryDate = this.deliveryDate ? this.deliveryDate.getTime(): 0
    const orderDeliveryStatus = new OrderDeliveryStatus("Order is Placed", deliveryDate, 0, this.commentsFromCustomer)
    this.groceryService.addDeliveryDateAndStatus(orderDeliveryStatus, user, orderTimestamp).catch(error => console.log(error))
  }

  private emptyShoppingCart() {
    this.groceryService.emptyShoppingCart(this.authService.getUser()).then(
      () =>
      this.displayThankYouDialog = true
    )
  }

  private sendOrderAcknowledgementMail() {
    const user = this.authService.getUserWithAllDetails()
    console.log("Getting user email " + user.email)
    this.http.post("http://localhost:3000/api/sendEmail", {email: user.email}).subscribe(value => {
        //console.log(value)
        //this.displayThankYouDialog = true
      }
    )
  }

  getCostOfIndividualOrder(order: Order) {
    return this.groceryService.getSumOfGrocery(order).toFixed(2)
  }
}
