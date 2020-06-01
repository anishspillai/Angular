import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {Router} from "@angular/router";
import {Order} from "../individual-grocery/model/Order";
import {GroceryService} from "../grocery-grid/grocery.service";

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


  constructor(readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly router: Router,
              private readonly groceryService: GroceryService) {
  }


  moveToConfirmationPage() {
    if(this.addGroceryToListObservableService.orders.length > 0) {
      this.sendCloseEvent()
      this.router.navigate(['order-confirmation'], {queryParams: {totalCost: this.getTotalCostOfOrderedItemsAsString()}});
    }
  }

  emptyCart() {
    this.addGroceryToListObservableService.emptyCart()
  }

  ngOnInit(): void {
    this.addGroceryToListObservableService.getOrders().subscribe(value => {
      this.ordersAddedByUser = value
    })
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





}
