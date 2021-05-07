import {Component, OnInit} from "@angular/core"
import {forkJoin, Observable, of} from "rxjs"
import {GroceryCount, IndividualGrocery} from "../individual-grocery/model/IndividualGrocery"
import {Order} from "../individual-grocery/model/Order"
import {AngularFireDatabase} from "@angular/fire/database"
import {ActivatedRoute} from "@angular/router"
import {GroceryCountService} from "../grocery-count.service";
import {ErrorLogService} from "../error-log.service";
import algoliasearch from "algoliasearch/lite";
import {SearchObservableServiceService} from "../search-observable-service.service";
import {catchError} from "rxjs/operators";


const searchClient = algoliasearch(
  'ZT1RBSHBBJ',
  '5f9196688a9e6f87d0c658fdd07623de'
);

@Component({
  selector: 'app-grocery-grid',
  templateUrl: './grocery-grid.component.html',
  styleUrls: ['./grocery-grid.component.css']
})
export class GroceryGridComponent implements OnInit {

  index = searchClient.initIndex("groceries")

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
  sortValues: SortValue[]

  brands = new Set()

  selectedBrands: string[] = [];
  sortableField: SortValue

  brandNamesForMobileApplication: []

  mainGroceryType: string
  isSubCategory: string
  isGlobalSearch: boolean;
  isHomePage = false
  isFastMovingProducts = false

  groceryCounts: GroceryCount[] = []

  ngOnInit() {

    this.groceryCountService.fetchGroceryCount()

    this.fillUpSortableFields()

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.searchCategoryType = params.get("groceryType")
      this.mainGroceryType = params.get("main")
      this.isSubCategory = params.get("subMenu")
      this.fetchGroceries()
    })

    this.search.getSearchObservable().subscribe(value => {
      this.filterBySearchString(value)
    })
  }

  constructor(private readonly firestore: AngularFireDatabase,
              private activatedRoute: ActivatedRoute,
              private readonly groceryCountService: GroceryCountService,
              private readonly errorLogService: ErrorLogService,
              private readonly search: SearchObservableServiceService) {
  }

  filterProduct(searchString: string) {
    this.groceryList = this.nonFilteredList.filter(value => value.brandName.toLowerCase().includes(searchString.toLowerCase()))
  }

  filterBySearchString(searchInput: string) {
    if (searchInput && searchInput.length > 0) {
      this.isGlobalSearch = true
      this.index.search(searchInput).then(({hits}) => {
        this.filteredGroceryList = hits as unknown as IndividualGrocery[]
        this.filteredGroceryList.forEach(individualGrocery => individualGrocery.id = individualGrocery.objectID)
      });
    } else {
      if (this.isGlobalSearch === true) {
        this.fetchGroceries()
      }
      this.isGlobalSearch = false
    }
  }

  fetchGroceries() {

    this.brands.clear()
    this.brandNamesForMobileApplication = []
    this.displayProgressSpinner = true
    this.groceryList = []
    this.isFastMovingProducts = false
    if (!this.searchCategoryType) {
      this.isFastMovingProducts = true
      this.filteredGroceryList = []

      const FORK_JOIN = forkJoin(
        {
          one: this.searchByFastMoving().pipe(catchError(error => of(error))),
          two: this.getStockByFastMoving().pipe(catchError(error => of(error)))
        }
      )

      FORK_JOIN.subscribe(() => this.displayProgressSpinner = false)

    } else {
      this.isGlobalSearch = false
      let URL: string

      if (this.searchCategoryType.includes("Fish")) {
        URL = this.searchCategoryType
        this.isFishType = true
      } else {
        this.isFishType = false
        URL = 'admin/Catagories/' + this.searchCategoryType
      }

      const SEARCH_TYPE = this.isSubCategory ? "subCatagory" : "catagory"

      const FORK_JOIN = forkJoin(
        {
          one: this.searchByProductType(SEARCH_TYPE).pipe(catchError(error => of(error))),
          two: this.getTheCountOfStockByCategory().pipe(catchError(error => of(error)))
        }
      )

      FORK_JOIN.subscribe(() => console.log(this.displayProgressSpinner = false))





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

  private searchByProductType(SEARCH_TYPE: string): Observable<any> {

    this.firestore.list("admin/Products", ref => ref.orderByChild(SEARCH_TYPE).equalTo(this.searchCategoryType)).snapshotChanges().subscribe(value => {
      this.groceryList = [];
      value.forEach(dataSnapshot => {
          // @ts-ignore
          const individualGrocery: IndividualGrocery = dataSnapshot.payload.val()
          individualGrocery.id = dataSnapshot.key
          this.groceryList.push(individualGrocery)
        }
      )

      this.extractBrands()

      this.filteredGroceryList = this.groceryList

      this.sortableField = {name: 'Sort By Brand Type', code: 'brandName'}
      this.performSorting()

      window.scrollTo(0, 0)
    }, error => {
      this.errorLogService.logErrorMessage('Admin', error)
    }
  )
    return of(1)
  }

  private getTheCountOfStockByCategory(): Observable<any> {
    this.firestore.list("admin/stock_count_table", ref => ref.orderByChild("category").equalTo(this.searchCategoryType)).snapshotChanges().subscribe(value => {
        value.forEach(dataSnapshot => {
            // @ts-ignore
            const groceryCountModel: GroceryCount = dataSnapshot.payload.val()
            groceryCountModel.id = dataSnapshot.key
            this.groceryCounts.push(groceryCountModel)
          }
        )
      }, error => {
        this.errorLogService.logErrorMessage('Admin', error)
      }
    )
    return of(2)
  }


  private searchByFastMoving() {
    this.firestore.list('admin/Products', ref => ref.orderByChild("isFastMoving").equalTo(true)).snapshotChanges().subscribe(value => {
        value.forEach(dataSnapshot => {
            // @ts-ignore
            const individualGrocery: IndividualGrocery = dataSnapshot.payload.val()
            individualGrocery.id = dataSnapshot.key
            this.filteredGroceryList.push(individualGrocery)
          }
        )

        this.groceryList = this.filteredGroceryList
        window.scrollTo(0, 0)
        this.extractBrands()
      }, error => {
        this.errorLogService.logErrorMessage('Admin', error)
      }
    )
    return of(1)
  }

  private getStockByFastMoving(): Observable<any> {
    this.firestore.list("admin/stock_count_table", ref => ref.orderByChild("isFastMoving").equalTo(true)).snapshotChanges().subscribe(value => {
        value.forEach(dataSnapshot => {
            // @ts-ignore
            const groceryCountModel: GroceryCount = dataSnapshot.payload.val()
            groceryCountModel.id = dataSnapshot.key
            this.groceryCounts.push(groceryCountModel)
          }
        )
        console.log(this.groceryCounts)
      }, error => {
        this.errorLogService.logErrorMessage('Admin', error)
      }
    )
    return of(2)
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

    if (this.selectedBrands.length > 0) {
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
    if (!this.sortableField) {
      this.filteredGroceryList.sort((a, b) => a.brandName.localeCompare(b.brandName))
    } else {
      if (this.sortableField.code === "lowPrice") {
        this.filteredGroceryList.sort((a, b) => a.actualPrice - b.actualPrice)
      } else if (this.sortableField.code === "highPrice") {
        this.filteredGroceryList.sort((a, b) => b.actualPrice - a.actualPrice)
      } else if (this.sortableField.code === "brandName") {
        this.filteredGroceryList.sort((a, b) => a.brandName.localeCompare(b.brandName))
      } else if (this.sortableField.code === "type") {
        this.filteredGroceryList.sort((a, b) => a.type.localeCompare(b.type))
      } else if (this.sortableField.code === "weight") {
        this.filteredGroceryList.sort((a, b) => a.weight - b.weight)
      }
    }
  }

  getHeader() {
    if (this.mainGroceryType) {
      return this.mainGroceryType + ' -> ' + this.searchCategoryType
    }
    return this.searchCategoryType
  }
}

interface SortValue {
  name: string;
  code: string;
}
