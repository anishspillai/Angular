import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {Router} from "@angular/router";
import {CountChangeTracker, Order, PriceChangeTracker} from "../individual-grocery/model/Order";
import {GroceryService} from "../grocery-grid/grocery.service";
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery";
import {AuthService} from "../auth/auth.service";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'app-review-ordered-items',
  templateUrl: './review-ordered-items.component.html',
  styleUrls: ['./review-ordered-items.component.css']
})
export class ReviewOrderedItemsComponent implements OnInit {

  @Input() displaySideMenuBar: boolean
  @Output() closeSideBarMenuEvent = new EventEmitter()
  @Input() isDesktopApplication = true
  ordersAddedByUser: Order[] = []

  // Elements for displaying stock count.
  ordersRemovedFromCart: Order[]
  priceChangedOrders: Order[]
  stockCountChangedOrders: Order[]

  // this one switches the display of stock count page.
  display = 'none';
  displayConfirmationDialogForEmptyOrder = 'none'

  constructor(readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly router: Router,
              private readonly groceryService: GroceryService,
              private readonly authService: AuthService) {
  }


  ngOnInit(): void {
    this.addGroceryToListObservableService.getOrders().subscribe(value => {
      this.ordersAddedByUser = value
    })
  }

  moveToConfirmationPage() {
    if(this.addGroceryToListObservableService.orders.length > 0) {
      this.sendCloseEvent()
      this.router.navigate(['order-confirmation'], {queryParams: {totalCost: this.getTotalCostOfOrderedItemsAsString(), 'checkOut': !this.isDesktopApplication}});
    }
  }

  confirmOrderInCartAndMoveToConfirmationPage() {
    this.executeBusinessLogicForOrderCountAndPriceCheck()
  }

  private executeBusinessLogicForOrderCountAndPriceCheck() {
    this.ordersRemovedFromCart = []
    this.priceChangedOrders = []
    this.stockCountChangedOrders = []

    const groceryDetailsArray$: Observable<any>[] = [];
    this.addGroceryToListObservableService.orders.forEach(grocery => {
      groceryDetailsArray$.push(this.groceryService.getIndividualGroceryDetails(grocery.id).pipe(take(1)).
      pipe(catchError(() =>
        of(JSON.parse("{\"type\":\"value\",\"payload\":null,\"key\":null}"))
      )));
    });

    forkJoin(groceryDetailsArray$).subscribe(value => {
      value.forEach(grocery => {
        const orderPlacedByUser = this.addGroceryToListObservableService.orders.find(value => value.id === grocery.payload?.key)
        const latestGroceryFromDB: IndividualGrocery = grocery?.payload?.val() as IndividualGrocery;

        if (latestGroceryFromDB) {
          if (latestGroceryFromDB.stock === 0) {
            this.ordersRemovedFromCart.push(orderPlacedByUser)
          } else {
            if (orderPlacedByUser.noOfItems > latestGroceryFromDB.stock) {
              orderPlacedByUser.countChangeTracker = new CountChangeTracker(orderPlacedByUser.noOfItems, latestGroceryFromDB.stock)
              this.stockCountChangedOrders.push(orderPlacedByUser)
            }
            if (orderPlacedByUser.actualPrice !== latestGroceryFromDB.actualPrice) {
              orderPlacedByUser.priceChangeTracker = new PriceChangeTracker(orderPlacedByUser.actualPrice, latestGroceryFromDB.actualPrice)
              this.priceChangedOrders.push(orderPlacedByUser)
            }
          }
        }
      })

      this.sendCloseEvent()

      if (this.ordersRemovedFromCart.length > 0 || this.stockCountChangedOrders.length > 0 || this.priceChangedOrders.length > 0) {
        this.display = 'block'
      } else {
        this.moveToConfirmationPage()
      }
    })
  }


  emptyCart() {
    this.displayConfirmationDialogForEmptyOrder = 'none'
    this.addGroceryToListObservableService.emptyCart()
  }

  increment(order: Order) {
    order.noOfItems = order.noOfItems += 1
    this.addGroceryToListObservableService.notifySubscribers()
  }

  decrement(order: Order) {
    if(order.noOfItems == 1) {
      this.addGroceryToListObservableService.decrementNoOfItems(order.noOfItems, order.id)
    } else {
      order.noOfItems -= 1
      this.addGroceryToListObservableService.notifySubscribers()
    }
  }

  sendCloseEvent() {
    this.closeSideBarMenuEvent.emit(false)
  }

  getTotalCostOfOrderedItems() {
    let totalCostOfTheOrder =  this.groceryService.getTotalCostOfOrderedItems(this.addGroceryToListObservableService.orders)
    return totalCostOfTheOrder
  }

  private getTotalCostOfOrderedItemsIncludingDeliveryCharge() {
    let totalCostOfTheOrder =  this.groceryService.getTotalCostOfOrderedItems(this.addGroceryToListObservableService.orders)
    if(totalCostOfTheOrder <= 400) {
      totalCostOfTheOrder += 30
    }

    return totalCostOfTheOrder
  }

  getTotalCostOfOrderedItemsAsString() {
    return this.getTotalCostOfOrderedItemsIncludingDeliveryCharge().toFixed(2)
  }

  getCostOfIndividualOrder(order: Order) {
    return this.groceryService.getSumOfGrocery(order).toFixed(2)
  }

  closeModelDialog() {
    this.hideTheStockWarningPage()
  }

  updateShoppingCartDatabaseAndCloseDialog() {
    this.hideTheStockWarningPage()
    this.updateItemsInTheShoppingCart();
    this.removeOutOfStockItemsFromCart()
    this.groceryService.addToTheShoppingCart(this.authService.getUser(), this.addGroceryToListObservableService.orders).then(r => console.log(r))
    this.closeModelDialog();
    this.moveToConfirmationPage();
  }

  hideTheStockWarningPage() {
    this.display = 'none'
  }

  private updateItemsInTheShoppingCart() {
    if(this.stockCountChangedOrders.length > 0 || this.priceChangedOrders.length > 0) {
      this.addGroceryToListObservableService.orders.forEach(value => {
        if(value.countChangeTracker) {
          value.noOfItems = value.countChangeTracker.newCount
        }
        if(value.priceChangeTracker) {
          value.actualPrice = value.priceChangeTracker.newCost
        }
      })
    }
  }

  private removeOutOfStockItemsFromCart() {
    if(this.ordersRemovedFromCart.length > 0) {
      this.ordersRemovedFromCart.forEach(removedOrder => {
        this.addGroceryToListObservableService.orders = this.addGroceryToListObservableService.orders.filter(value => value.id != removedOrder.id)
      })
    }
  }

  displayConfirmationDialogForItemsFromCart() {
    this.displayConfirmationDialogForEmptyOrder = 'block'
  }
}
