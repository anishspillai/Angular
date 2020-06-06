import {Component, OnInit} from "@angular/core"
import {Observable} from "rxjs"
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery"
import {Order} from "../individual-grocery/model/Order"
import {MenuItem} from "primeng/api"
import {AngularFireDatabase} from "@angular/fire/database"
import {ActivatedRoute} from "@angular/router"
import {GroceryCountService} from "../grocery-count.service";

@Component({
  selector: 'app-grocery-grid',
  templateUrl: './grocery-grid.component.html',
  styleUrls: ['./grocery-grid.component.css']
})
export class GroceryGridComponent implements OnInit{

  title = 'MallOfShopping';
  items: Observable<any[]>;
  groceryList: IndividualGrocery[] = [new IndividualGrocery()]
  nonFilteredList: IndividualGrocery[] = []
  orderedList: Order[] = []
  displayProgressSpinner = false
  name: string;
  searchCategoryType: string

  ngOnInit() {

    var one: IndividualGrocery = new IndividualGrocery()
    one.brandName = "Anish S PIllai"
    one.actualPrice = 4.45
    one.offerPrice = 0
    one.weight = 7.8
    one.unitOfWeight = "Kg"
    one.type = "Pongal Rice"
    one.id = "One"
    one.maxShoppingCount = 2
    one.maxShoppingIsRestricted = true

    this.groceryList.push(one)

    var two: IndividualGrocery = new IndividualGrocery()
    two.brandName = "Anish S PIllai Anish"
    two.actualPrice = 200.12
    two.offerPrice = 0
    two.weight = 7.8
    two.unitOfWeight = "Kg"
    two.type = "rice"
    two.id = "Two"
    two.bulkPurchaseOfferAvailable = true
    two.bulkPurchaseOfferPrice = 150.14
    two.bulkPurchaseOfferCount = 2

    this.groceryList.push(two)

    this.groceryCountService.fetchGroceryCount()

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.searchCategoryType = params.get("groceryType")
      this.fetchGroceries()
    })
  }

  constructor(private  readonly firestore: AngularFireDatabase,
              private activatedRoute: ActivatedRoute,
              private readonly groceryCountService: GroceryCountService) {
  }

  filterProduct(searchString: string) {
    this.groceryList = this.nonFilteredList.filter(value => value.brandName.toLowerCase().includes(searchString.toLowerCase()))
  }

  fetchGroceries() {
  this.displayProgressSpinner = true
  this.groceryList = []
    if(!this.searchCategoryType) {

      this.firestore.list('admin/Campaign').valueChanges().forEach(grocery => {
        grocery.forEach(individualGrocery => {
          const individualGroc: IndividualGrocery = individualGrocery as IndividualGrocery
          this.groceryList.push(individualGroc)
        })
        this.displayProgressSpinner = false
      })

      /**this.firestore.list('admin/Catagories').valueChanges().forEach(value => value.forEach(value1 => {
          for (let val of Object.values(value1)) {
            val.forEach(value2 => {
              var anish: IndividualGrocery = value2 as IndividualGrocery
              this.groceryList.push(anish)
              this.nonFilteredList.push(anish)
            })
          }
          this.displayProgressSpinner = false
        }
      )).then(r => console.log(r))*/

    } else {
      this.firestore.list('admin/Catagories/' + this.searchCategoryType).valueChanges().forEach(grocery => {
        grocery.forEach(groceryUnit => {
          const individualGrocery: IndividualGrocery = groceryUnit as IndividualGrocery
          this.groceryList.push(individualGrocery)
        });

        this.displayProgressSpinner = false
      })
     }
  }

}
