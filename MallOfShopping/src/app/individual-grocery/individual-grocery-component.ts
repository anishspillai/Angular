import {Component, Input} from "@angular/core";
import {IndividualGrocery} from "./model/IndividualGrocery";
import {Order} from "./model/Order";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {GroceryCountService} from "../grocery-count.service";

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

  constructor(private addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly groceryCountService: GroceryCountService) {
  }

  addItemToCart() {
    this.isDisplayAddButton = this.isNotAddedIntoTheList()

    const order = Order.createThisObjectFromIndividualGrocerObject(this.individualGrocery)

    this.addGroceryToListObservableService.addGroceryToTheOrderList(order)
  }

  getOrders() {
    return this.addGroceryToListObservableService.orders.length > 0
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

  private updateCountOfItems() {
    const individualGroceryFromOrderedList = this.orderedGroceryList.find(element => element.id == this.individualGrocery.id)
    individualGroceryFromOrderedList.noOfItems = this.noOfItems
  }

  displayDialog() {
    this.isDisplayDetails = true
  }

  getAlertMessage() {
    return "Offer price is applicable for maximum " + this.individualGrocery.maxShoppingCount+  " per customer. Actual price is applicable after "+ this.individualGrocery.maxShoppingCount
  }

  getNOOfOrders() {
    if(this.addGroceryToListObservableService.orders)
    return this.addGroceryToListObservableService.orders.length

    return 100
  }
}
