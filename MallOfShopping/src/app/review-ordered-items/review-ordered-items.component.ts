import {Component, Input, OnInit} from '@angular/core';
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

  ordersAddedByUser: Order[] = []


  constructor(private readonly addGroceryToListObservableService: AddGroceryToListObservableService) {
  }


  ngOnInit(): void {
    this.addGroceryToListObservableService.getOrders().subscribe(value => {
      this.ordersAddedByUser = value
    })
  }

  increment(noOfItems: number, id: string) {
    this.addGroceryToListObservableService.incrementNoOfItems(noOfItems, id)
  }

  decrement(noOfItems: number, id: string) {
    this.addGroceryToListObservableService.decrementNoOfItems(noOfItems, id)
  }

}
