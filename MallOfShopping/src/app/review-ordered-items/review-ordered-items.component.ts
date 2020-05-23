import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {Router} from "@angular/router";
import {Order} from "../individual-grocery/model/Order";

@Component({
  selector: 'app-review-ordered-items',
  templateUrl: './review-ordered-items.component.html',
  styleUrls: ['./review-ordered-items.component.css']
})
export class ReviewOrderedItemsComponent implements OnInit {

  @Input() displaySideMenuBar: boolean

  @Output() closeSideBarMenuEvent = new EventEmitter()

  ordersAddedByUser: Order[] = []


  constructor(readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly router: Router) {
  }


  moveToConfirmationPage() {
    if(this.addGroceryToListObservableService.orders.length > 0) {
      this.sendCloseEvent()
      this.router.navigate(['order-confirmation']);
    }




    /**this.router.navigateByUrl('/order-confirmation', { skipLocationChange: true }).then(() => {
      this.router.navigate(['order-confirmation']);
    });*/
  }

  emptyCart() {
    //this.addGroceryToListObservableService.emptyCart()
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
