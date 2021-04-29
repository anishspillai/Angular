import {Component, Input, OnInit} from '@angular/core';
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {GroceryCountService} from "../grocery-count.service";
import {AuthService} from "../auth/auth.service";
import {Order} from "../individual-grocery/model/Order";

@Component({
  selector: 'app-new-product-ind-grocery',
  templateUrl: './new-product-ind-grocery.component.html',
  styleUrls: ['./new-product-ind-grocery.component.css']
})
export class NewProductIndGroceryComponent implements OnInit {

  constructor(private addGroceryToListObservableService: AddGroceryToListObservableService,
              readonly groceryCountService: GroceryCountService,
              private readonly authService: AuthService) {
  }

  @Input() individualGrocery: IndividualGrocery
  @Input() orders: Order[] = []

  displayLoginPage = false
  @Input() isDisplayAddButton = true;

  ngOnInit(): void {
  }

  addToCart() {

    if(!this.authService.isLoggedIn) {
      this.displayLoginPage = true
      return
    }

    const order = Order.createThisObjectFromIndividualGrocerObject(this.individualGrocery)

    this.addGroceryToListObservableService.addGroceryToTheOrderList(order)
    this.isDisplayAddButton = true
  }
}
