import {Component, OnInit} from "@angular/core"
import {Observable} from "rxjs"
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery"
import {Order} from "../individual-grocery/model/Order"
import {AngularFireDatabase} from "@angular/fire/database"
import {ActivatedRoute} from "@angular/router"
import {GroceryCountService} from "../grocery-count.service";
import {ErrorLogService} from "../error-log.service";

@Component({
  selector: 'app-grocery-grid',
  templateUrl: './grocery-grid.component.html',
  styleUrls: ['./grocery-grid.component.css']
})
export class GroceryGridComponent implements OnInit{

  title = 'MallOfShopping';
  items: Observable<any[]>;
  groceryList: IndividualGrocery[] = []
  filteredGroceryList: IndividualGrocery[] = []
  nonFilteredList: IndividualGrocery[] = []
  orderedList: Order[] = []
  displayProgressSpinner = false
  name: string;
  searchCategoryType: string
  isFishType = false
  sortValues:  SortValue[]

  brands = new Set()

  selectedBrands: string[] = [];
  sortableField: SortValue

  brandNamesForMobileApplication: []

  mainGroceryType: string
  isSubCategory: string
  isHomePage = false

  ngOnInit() {

    this.groceryCountService.fetchGroceryCount()

    this.fillUpSortableFields()

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.searchCategoryType = params.get("groceryType")
      this.mainGroceryType = params.get("main")
      this.isSubCategory = params.get("subMenu")
      this.fetchGroceries()
    })
  }

  constructor(private  readonly firestore: AngularFireDatabase,
              private activatedRoute: ActivatedRoute,
              private readonly groceryCountService: GroceryCountService,
              private readonly errorLogService: ErrorLogService) {
  }

  filterProduct(searchString: string) {
    this.groceryList = this.nonFilteredList.filter(value => value.brandName.toLowerCase().includes(searchString.toLowerCase()))
  }

  fetchGroceries() {
  this.brands.clear()
  this.brandNamesForMobileApplication = []
  this.displayProgressSpinner = true
  this.groceryList = []
    if(!this.searchCategoryType) {
      this.isHomePage  = true

      this.firestore.list('admin/Products', ref => ref.orderByChild("isCampaign").equalTo(true)).snapshotChanges().subscribe(value => {
          value.forEach(dataSnapshot => {
              // @ts-ignore
              const individualGrocery: IndividualGrocery = dataSnapshot.payload.val()
              individualGrocery.id = dataSnapshot.key
              this.filteredGroceryList.push(individualGrocery)
            }

          )

          window.scrollTo(0, 0)
          this.displayProgressSpinner = false
        }, error => {
          this.errorLogService.logErrorMessage('Admin', error)
        }
      )

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
      let URL: string

      if(this.searchCategoryType.includes("Fish")) {
        URL = this.searchCategoryType
        this.isFishType = true
      } else {
        this.isFishType = false
        URL = 'admin/Catagories/' + this.searchCategoryType
      }

      const SEARCH_TYPE = this.isSubCategory ? "subCatagory" : "catagory"

      this.firestore.list("admin/Products", ref => ref.orderByChild(SEARCH_TYPE).equalTo(this.searchCategoryType)).snapshotChanges().subscribe(value => {
        value.forEach(dataSnapshot => {
            // @ts-ignore
          const individualGrocery: IndividualGrocery = dataSnapshot.payload.val()
          individualGrocery.id = dataSnapshot.key
          this.groceryList.push(individualGrocery)
          }

        )

        this.extractBrands()

        this.filteredGroceryList = this.groceryList

        this.sortableField =  {name:'Sort By Brand Type', code: 'brandName'}
        this.performSorting()

        window.scrollTo(0, 0)
        this.displayProgressSpinner = false
    }, error => {
        this.errorLogService.logErrorMessage('Admin', error)
        }
      )

      /**this.firestore.list("admin/Products", ref => ref.orderByChild(SEARCH_TYPE).equalTo(this.searchCategoryType)).valueChanges().forEach(grocery => {
        grocery.forEach(groceryUnit => {
          const individualGrocery: IndividualGrocery = groceryUnit as IndividualGrocery
          this.groceryList.push(individualGrocery)
        });
        window.scrollTo(0, 0)
        this.displayProgressSpinner = false
      }).catch(reason =>
        this.errorLogService.logErrorMessage('Admin', reason)
      )*/

     }
  }

  private extractBrands() {
    this.groceryList.forEach(value => {
      this.brands.add(value.brandName)
    }
    )


    this.brands.forEach(value => {
      // @ts-ignore
      this.brandNamesForMobileApplication.push({'label': value, 'value': value});
    })
  }

  applyFilter() {

    if(this.selectedBrands.length > 0) {
      this.filteredGroceryList = this.groceryList.filter(
        function (individualGrocery) {
          return this.indexOf(individualGrocery.brandName) >= 0;
        },
        this.selectedBrands
      );
    } else {
      this.filteredGroceryList = this.groceryList
    }
  }

  private fillUpSortableFields() {
    this.sortValues = [{name: 'Sort By Brand Type', code: 'brandName'},
      {name: 'Price: Low to High', code: 'lowPrice'},
      {name: 'Price: High to Low', code: 'highPrice'},
      {name: 'Sort By Grocery Type', code: 'type'},
      {name: 'Sort By Weight', code: 'weight'}
      ]
  }

  performSorting() {
    if(!this.sortableField) {
      this.filteredGroceryList.sort((a, b) => a.brandName.localeCompare(b.brandName))
    } else {
      if(this.sortableField.code === "lowPrice") {
        this.filteredGroceryList.sort((a, b) => a.actualPrice - b.actualPrice)
      } else if(this.sortableField.code === "highPrice") {
        this.filteredGroceryList.sort((a, b) => b.actualPrice - a.actualPrice)
      } else if(this.sortableField.code === "brandName") {
        this.filteredGroceryList.sort((a, b) => a.brandName.localeCompare(b.brandName))
      } else if(this.sortableField.code === "type") {
        this.filteredGroceryList.sort((a, b) => a.type.localeCompare(b.type))
      } else if(this.sortableField.code === "weight") {
        this.filteredGroceryList.sort((a, b) => a.weight - b.weight)
      }
    }
  }
}

interface SortValue {
  name: string;
  code: string;
}
