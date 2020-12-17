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

  updateItem = false

  countOfItems: string

  newPrice: string

  descriptionText : string

  subCatagory: string = "Seasoning Mix"

  updateDescription: boolean;

  constructor(private addGroceryToListObservableService: AddGroceryToListObservableService,
              readonly groceryCountService: GroceryCountService) {
  }

  addItemToCart() {
    this.isDisplayAddButton = this.isNotAddedIntoTheList()

    const order = Order.createThisObjectFromIndividualGrocerObject(this.individualGrocery)

    this.addGroceryToListObservableService.addGroceryToTheOrderList(order)
  }



  updateThisItem() {
    this.updateItem  =true
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

  makeTheItemInStock() {
    this.groceryCountService.updateCountOfGrocery(this.individualGrocery.id, Number(this.countOfItems))
    this.updateItem = false

  }

  makeTheItemOutOfStock() {
    this.groceryCountService.updateCountOfGrocery(this.individualGrocery.id, 0)
    this.updateItem = false
  }

  setThePriceForTheItem() {
    this.groceryCountService.setPriceForTheGrocerItem(this.individualGrocery.id, Number(this.newPrice))
    //this.updateItem = false
  }

  setTheDescription() {
    this.groceryCountService.setDescription(this.individualGrocery.id, this.descriptionText).then(value => this.updateDescription = false)
    //this.updateItem = false
  }

  newWeight
  setNewWeight() {
    this.groceryCountService.setNewWeight(this.individualGrocery.id, this.newWeight)
    //this.updateItem = false
  }

  unitOfWeight
  setUnitOfWeight() {
    this.groceryCountService.setUnitOfWeight(this.individualGrocery.id, this.unitOfWeight)
    //this.updateItem = false
  }

  deleteMe() {
    this.groceryCountService.deleteMe(this.individualGrocery.id)
    this.updateItem = false

  }

  updateSubCatagory() {
    this.groceryCountService.setSubCatagory(this.individualGrocery.id, this.subCatagory)
    this.updateItem = false

  }

  displayMe() {
    alert(JSON.stringify(this.individualGrocery))
  }
}
