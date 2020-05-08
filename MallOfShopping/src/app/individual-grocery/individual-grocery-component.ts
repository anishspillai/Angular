import {Component, Input} from "@angular/core";
import {IndividualGrocery} from "./model/IndividualGrocery";
import {Order} from "./model/Order";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";

@Component({
  selector: 'app-individual-grocery',
  templateUrl: './individual-grocery-component.html',
  styleUrls: ['./individual-grocery-component.css']
})

export class IndividualGroceryComponent {

  isDisplayAddButton: Boolean = true

  noOfItems: number = 1

  isDisplayDetails: Boolean = false

  @Input() individualGrocery: IndividualGrocery

  @Input() orderedGroceryList: Order[] = []

  constructor(private addGroceryToListObservableService: AddGroceryToListObservableService) {
  }

  addItemToCart() {
    this.isDisplayAddButton = false

    const order = Order.createThisObjectFromIndividualGrocerObject(this.individualGrocery)

    this.orderedGroceryList.push(order)
    this.addGroceryToListObservableService.addGroceryToTheOrderList(order)
  }

  incrementNoOfItems(): void {
    this.noOfItems++
    this.updateCountOfItems()

    this.addGroceryToListObservableService.incrementNoOfItems(this.noOfItems, this.individualGrocery.id)
  }

  decrementNoOfItems(): void {

    if (this.noOfItems == 1) {
      this.orderedGroceryList = this.orderedGroceryList.filter(value => value.id != this.individualGrocery.id)
      this.isDisplayAddButton = true
      this.addGroceryToListObservableService.decrementNoOfItems(this.noOfItems, this.individualGrocery.id)
    } else {
      this.noOfItems--
      this.updateCountOfItems()
      this.addGroceryToListObservableService.decrementNoOfItems(this.noOfItems, this.individualGrocery.id)
    }
  }

  private updateCountOfItems() {
    const individualGroceryFromOrderedList = this.orderedGroceryList.find(element => element.id = this.individualGrocery.id)
    individualGroceryFromOrderedList.noOfItems = this.noOfItems
  }

  displayDialog() {
    this.isDisplayDetails = true
  }
}
