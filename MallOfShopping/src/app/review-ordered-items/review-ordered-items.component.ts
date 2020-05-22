import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {GroceryService} from "../grocery-grid/grocery.service";
import {BreadCrumbService} from "../bread-crumb/bread-crumb.service";
import {Order} from "../individual-grocery/model/Order";
import {IndividualGroceryComponent} from "../individual-grocery/individual-grocery-component";

@Component({
  selector: 'app-review-ordered-items',
  templateUrl: './review-ordered-items.component.html',
  styleUrls: ['./review-ordered-items.component.css']
})
export class ReviewOrderedItemsComponent implements OnInit {

  @Input() displaySideMenuBar: boolean

  @Output() closeSideBarMenuEvent = new EventEmitter()

  ordersAddedByUser: Order[] = []


  constructor(private readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly router: Router) {
  }


  moveToConfirmationPage() {
    this.sendCloseEvent()
    this.router.navigate(['order-confirmation']);
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

}
