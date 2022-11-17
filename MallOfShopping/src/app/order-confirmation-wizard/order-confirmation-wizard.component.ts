import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {GroceryService} from "../grocery-grid/grocery.service";
import {UserDetailsService} from "../user-details/user.details.service";
import {ErrorLogService} from "../error-log.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {AuthService} from "../auth/auth.service";
import {Order} from "../individual-grocery/model/Order";
import {forkJoin, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

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
  isMobileDevice: boolean;

  display = 'none';

  constructor(private confirmationService: ConfirmationService,
              private readonly router: Router,
              readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly groceryService: GroceryService,
              private readonly  userDetailsService: UserDetailsService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly errorLogService: ErrorLogService,
              private  readonly firestore: AngularFireDatabase,
              private readonly authService: AuthService,
              ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.totalCost = params.get("totalCost")
      this.isMobileDevice = params.get("checkOut") === 'true'
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
  }

  placeOrder() {
    let addressMissing: boolean = false
    const user: string = localStorage.getItem('application_Id')
    this.userDetailsService.getUserDetails(user).subscribe(value => {
      if (!value || value.length == 0) {
        this.displayAddressMissingDialog = true
        addressMissing = true
      }

      if (!addressMissing) {
        this.orderBeingPlaced = true
        const orderTimestamp = new Date().getTime()
        this.isOrderPlaced = false
        this.groceryService.placeOrderForTheUser(this.addGroceryToListObservableService.orders, user, orderTimestamp).then(() => {
          this.isOrderPlaced = true

          const JOIN_API = forkJoin(
            {
              one: this.updateCountOfGroceries(user).pipe(catchError(() => of(undefined))),
              two: this.emptyShoppingCart(),
              //three: this.addDeliveryStatus(orderTimestamp, user)
            }
          )

          JOIN_API.subscribe(() =>
            this.displayThankYouDialogToUser(),
            (err) => {
              this.errorLogService.logErrorMessage(user, err)
            })

        })
          .catch(err => {
            this.orderBeingPlaced = false
            if (!this.isOrderPlaced) {
              this.displayErrorDialog = true
            }
            this.errorLogService.logErrorMessage(user, err)
          });
      }
    })

  }

  private updateCountOfGroceries(user: string): Observable<any> {
    let promises = [];
    this.addGroceryToListObservableService.orders.forEach(orderedGrocery => {
        promises.push(
          this.updateTheCountInDataBase(orderedGrocery)
        )
      }
    )

    Promise.all(promises).then(() => console.log("")).catch(err => this.errorLogService.logErrorMessage(user, err))
    return of(1)
  }

  updateTheCountInDataBase(orderedGrocery: Order): Promise<any> {
    return this.firestore.database.ref('admin/Products/' + orderedGrocery.id + '/stock').transaction((currentStock) => {
      if (currentStock) {
        const totalCount = currentStock - orderedGrocery.noOfItems
        return totalCount > 0 ? totalCount : 0;
      } else {
        return 5
      }
    })
  }

  navigateToTheMainPage() {
    this.orderBeingPlaced = false;
    this.displayThankYouDialog = false
    localStorage.setItem('no-reload', 'no reload')
    this.router.navigate(['order-history']);
  }

  private addDeliveryStatus(orderTimestamp: number, user: string) {
    const deliveryDate = this.deliveryDate ? this.deliveryDate.getTime(): 0
    const orderDeliveryStatus = new OrderDeliveryStatus("Order is Placed", deliveryDate, 0, this.commentsFromCustomer)
    return this.groceryService.addDeliveryDateAndStatus(orderDeliveryStatus, user, orderTimestamp).catch(error => console.log(error))
  }

  private emptyShoppingCart() : Promise<boolean>{
    return this.groceryService.emptyShoppingCart(this.authService.getUser()).then(
      () =>
      this.displayThankYouDialog = true
    )
  }

  getTotalCostOfOrderedItemsIncludingDeliveryCharge() {
    let totalCostOfTheOrder =  this.groceryService.getTotalCostOfOrderedItems(this.addGroceryToListObservableService.orders)
    if(totalCostOfTheOrder <= 400) {
      totalCostOfTheOrder += 30
    }

    return totalCostOfTheOrder
  }

  private displayThankYouDialogToUser() {
    this.display = 'block'
  }

  closeDialogAndNavigateToOrderHistoryPage() {
    this.display = 'none'
    this.orderBeingPlaced = false
    this.router.navigate(['order-history']);
  }
}
