import {Component, Input} from "@angular/core";
import {IndividualGrocery} from "./model/IndividualGrocery";
import {Order} from "./model/Order";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {GroceryCountService} from "../grocery-count.service";
import {ProductDescription} from "./model/ProductDescription";
import validate = WebAssembly.validate;

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

  swedishInformation : string

  allergyInformation : string

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
    const stockCount = new GroceryCount();
    stockCount.stockCount = Number(this.countOfItems);
    stockCount.category = this.individualGrocery.subCatagory ? this.individualGrocery.subCatagory : this.individualGrocery.catagory;
    stockCount.isFastMoving = false
    this.groceryCountService.updateCountOfGrocery(this.individualGrocery.id, stockCount)
    this.updateItem = false

  }

  makeTheItemInStock1() {
    this.groceryCountService.removeItemFromOutofStockTable(this.individualGrocery.id)

    this.updateItem = false

  }

  makeTheItemOutOfStock() {
    this.groceryCountService.updateCountOfGroceryToZero(this.individualGrocery.id)
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

  updateSwedishDescription() {
    this.groceryCountService.setSwedishDescription(this.productDescription.id, this.swedishInformation)
    //this.isUpdateSwedishDescription = false

  }

  updateAllergyInformation() {
    this.groceryCountService.setAllergyInformation(this.productDescription.id, this.allergyInformation)
    //this.updateItem = false
  }

  updateNutrients() {
    this.groceryCountService.setNutrients(this.productDescription.id, this.nutrients)
    //this.updateItem = false
  }

  updateHeader() {
    this.groceryCountService.setHeader(this.productDescription.id, this.header)
    //this.updateItem = false
  }

  updateWebsite() {
    this.groceryCountService.setActualWebsiteLink(this.productDescription.id, this.actualWebsiteLink)
    //this.updateItem = false
  }

  isUpdateSwedishDescription = false;
  nutrients: string
  header: string;
  actualWebsiteLink: string;


  updateDescriptionInDB() {
    const productDescription = new ProductDescription()
    productDescription.allergyInformation = this.allergyInformation
    productDescription.nutrients = this.nutrients
    productDescription.swedishDescription = this.swedishInformation ? this.swedishInformation : this.individualGrocery.swedishDescription
    productDescription.id = this.individualGrocery.id
    productDescription.header = this.header
    productDescription.actualWebsiteLink = this.actualWebsiteLink


    this.groceryCountService.addProductDescriptionIntoDataBase(productDescription)
    this.isUpdateSwedishDescription = false
  }


  productDescription: ProductDescription
  idOfAnotherProduct: string;

  invokeTest() {

    this.groceryCountService.getProductDescription(this.idOfAnotherProduct ? this.idOfAnotherProduct: this.individualGrocery.id).subscribe(




      value => {

        this.idOfAnotherProduct ? this.isUpdateSwedishDescription = true: this.isUpdateSwedishDescription = true;
        value.forEach( value1 => {  this.productDescription = value1.payload.val() as ProductDescription;


        if(!this.idOfAnotherProduct) {
          this.productDescription.id = value1.payload.key
        }


        this.swedishInformation = this.productDescription.swedishDescription
        this.actualWebsiteLink = this.productDescription.actualWebsiteLink
        this.allergyInformation = this.productDescription.allergyInformation
        this.header = this.productDescription.header
        this.nutrients = this.productDescription.nutrients




      })})
  }

  copyAndPopulate() {

  }
}


export class GroceryCount {
stockCount?: number;
  category?: string;
  isFastMoving?: boolean;
}
