import {Component, Input, OnInit} from "@angular/core";
import {IndividualGrocery} from "./model/IndividualGrocery";
import {Order} from "./model/Order";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {GroceryCountService} from "../grocery-count.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-individual-grocery',
  templateUrl: './individual-grocery-component.html',
  styleUrls: ['./individual-grocery-component.css']
})

export class IndividualGroceryComponent {

  isDisplayAddButton: Boolean = true

  noOfItems: number = 1

  displayMaxShoppingAlert: boolean = false

  displayMaxShoppingAlertInDialog: boolean = false

  isDisplayDetails: Boolean = false

  @Input() individualGrocery: IndividualGrocery

  @Input() orderedGroceryList: Order[] = []

  @Input() isDesktopApplication = true

  displayLoginPage = false

  constructor(private addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly authService: AuthService) {
  }

  addItemToCart() {

    if(!this.authService.isLoggedIn) {
      this.displayLoginPage = true
      return
    }

    if (this.individualGrocery.id === '-Ma-c-1ajcPNJGJPeZXY' || this.individualGrocery.id === '5878y') {
      const orders:Order[] =  this.addGroceryToListObservableService.getOrdersArray()
      if (orders && (orders.find(value => value.id === '-Ma-c-1ajcPNJGJPeZXY') != undefined || orders.find(value => value.id === '5878y') != undefined)) {
        alert("Sorry, Due to the limited stock, you are allowed to add only one bag of sona masoori rice into the cart")
        return
      }
    }


    this.isDisplayAddButton = this.isNotAddedIntoTheList()

    const order = Order.createThisObjectFromIndividualGrocerObject(this.individualGrocery)

    this.addGroceryToListObservableService.addGroceryToTheOrderList(order)
  }

  isNotAddedIntoTheList() {
    if ( this.addGroceryToListObservableService.orders.length == 0 ) {
      return true
    } else {
      const individualGroceryFromOrderedList = this.addGroceryToListObservableService.orders.find(element => element.id == this.individualGrocery.id)
      return individualGroceryFromOrderedList == null
    }
  }

  getNoOfOrders() {
    if (! ( this.addGroceryToListObservableService.orders.length == 0 ) ) {
      const individualGroceryFromOrderedList = this.addGroceryToListObservableService.orders.find(element => element.id == this.individualGrocery.id)
      if( individualGroceryFromOrderedList ) {
        this.noOfItems = individualGroceryFromOrderedList.noOfItems
      }
    }

    return this.noOfItems
  }

  incrementNoOfItems(isMainPage: boolean): void {

    if(this.individualGrocery.id === '-Ma-c-1ajcPNJGJPeZXY' || this.individualGrocery.id === '5878y') {
      alert("Sorry, Due to the limited stock, you are allowed to add only one bag of sona masoori into the cart")
      return
    }

    this.noOfItems++
    if(this.individualGrocery.maxShoppingIsRestricted) {
      if(this.noOfItems - this.individualGrocery.maxShoppingCount == 1) {
        if(isMainPage) {
          this.displayMaxShoppingAlert = true
        } else {
          this.displayMaxShoppingAlertInDialog = true
        }
      }
    }

    this.addGroceryToListObservableService.incrementNoOfItems(this.noOfItems, this.individualGrocery.id)
  }

  decrementNoOfItems(): void {

    if (this.noOfItems == 1) {
      this.orderedGroceryList = this.orderedGroceryList.filter(value => value.id != this.individualGrocery.id)
      this.isDisplayAddButton = true
      this.addGroceryToListObservableService.decrementNoOfItems(this.noOfItems, this.individualGrocery.id)
    } else {
      this.noOfItems--
      //this.updateCountOfItems()
      this.addGroceryToListObservableService.decrementNoOfItems(this.noOfItems, this.individualGrocery.id)
    }
  }

  getAlertMessage() {
    return "Offer price is applicable for maximum " + this.individualGrocery.maxShoppingCount+  " per customer. Actual price is applicable after "+ this.individualGrocery.maxShoppingCount
  }

  // Logic for button label
  getLabel(individualGrocery: IndividualGrocery) {
     if(individualGrocery.catagory === "Vegetable") {
       if(individualGrocery.type.includes("Mango")) {
         return "Add to cart"
       } else {
         return "Add to cart"
       }
     }

     return "Add To Cart";
  }

  isStockAvailable(stockCount: number) {
      return stockCount > 0
  }
}
