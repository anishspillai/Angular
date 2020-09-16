import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {User} from "firebase";
import {AuthService} from "../auth/auth.service";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {Order} from "../individual-grocery/model/Order";
import {GroceryService} from "../grocery-grid/grocery.service";
import {BreadCrumbService} from "../bread-crumb/bread-crumb.service";
import {MenuItem} from "primeng/api";
import {Menu} from "primeng/menu";
import algoliasearch from "algoliasearch/lite";
import {SearchObservableServiceService} from "../search-observable-service.service";

const searchClient = algoliasearch(
  '7T3P8MD8DJ',
  '2e0c7df916e5f6c5094e588bbac1fee7'
);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchString: string
  menuItems: MenuItem[];
  ordersAddedByUser: Order[] = []
  displaySideMenuBar: boolean = false
  displayLoginPage: boolean = false
  isDesktopApplication = true
  displayNavigator = false

  items: MenuItem[];

  config = {
    indexName: 'mallofgroceries',
    searchClient
  };


  constructor(private readonly router: Router,
              private readonly auth: AuthService,
              private readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly groceryService: GroceryService,
              private readonly breadCrumbService: BreadCrumbService,
              private readonly searchInput: SearchObservableServiceService) {

    this.menuItems = [
      {label: 'My Details', target: 'user-details'},
      {label: 'Order History', target: 'order-history'}
    ];

  }

  ngOnInit(): void {
    this.addGroceryToListObservableService.getOrders().subscribe(value => {
      this.ordersAddedByUser = value
    })
  }

  filterProduct(): void {
    //this.gridComponent.filterProduct(this.searchString)
  }

  navigateToThePage(menuItem: MenuItem) {
    this.router.navigate([menuItem.target]);
    this.breadCrumbService.updateBreadCrumb([{label: menuItem.label}])
  }

  logIn() {
    this.displayLoginPage = true
  }

  proceedToNextPage() {
    if(this.auth.isLoggedIn) {
      this.displaySideMenuBar = true
    } else {
      this.logIn()
    }
  }

  logOut() {
    this.auth.logout().then(r => console.log(r))
  }

  getUser(): string {
    const user: string = localStorage.getItem('application_Id')
    if (user == null) {
      return 'Hello, Log-in..'
    }
    return 'More options...'
  }

  isLoggedIn(): Boolean {
    return this.auth.isLoggedIn
  }

  getCostOfItem() {

    return this.groceryService.getTotalCostOfOrderedItems(this.ordersAddedByUser).toFixed(2)

    /**let sumOfItems = 0

    this.ordersAddedByUser.forEach(function (element) {

      //sumOfItems += this.groceryService.getSumOfGrocery(element)

      if (element.bulkPurchaseOfferAvailable) {

        if(element.noOfItems >= element.bulkPurchaseOfferCount) {
          let totalSet = element.noOfItems / element.bulkPurchaseOfferCount
          sumOfItems += Math.floor(totalSet) * element.bulkPurchaseOfferPrice
        }

        let extraItems = element.noOfItems % element.bulkPurchaseOfferCount

        sumOfItems += extraItems * element.actualPrice

      } else if (element.maxShoppingIsRestricted) {

        if (element.noOfItems <= element.maxShoppingCount) {
          sumOfItems += element.noOfItems * element.offerPrice
        } else {
          let a = element.noOfItems - element.maxShoppingCount
          sumOfItems += (a * element.actualPrice) + (element.maxShoppingCount * element.offerPrice)
        }

      } else {
        if(element.offerPrice == 0) {
          sumOfItems += element.noOfItems * element.actualPrice
        } else {
          sumOfItems += element.noOfItems * element.offerPrice
        }
      }
    });

    return sumOfItems.toFixed(2) */
  }

  getCountOfItems() {
    const sum = this.ordersAddedByUser.reduce((sum, current) =>
      sum + current.noOfItems, 0)

    return sum
  }

  loadSideBarMenu() {
    this.isDesktopApplication = false
    this.proceedToNextPage()
  }

  displayMenuItemsForUser(menu: Menu, $event) {


    if (this.auth.isLoggedIn) {
      this.items = [{
        label: 'Options',
        items: [
          {label: 'Your Details', icon: 'pi pi-user', url: 'user-details'},
          {label: 'Order History', icon: 'pi pi-shopping-cart', routerLink: ['/order-history']},
          {label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logOut()}
        ]
      }]
    } else {
      this.items = [{
        label: 'Options',
        items: [
          {label: 'Your Details', icon: 'pi pi-user', url: 'user-details'},
          {label: 'Order History', icon: 'pi pi-shopping-cart', routerLink: ['/order-history']},
          {label: 'Login', icon: 'pi pi pi-sign-in', command: () => this.logIn(), styleClass: "buttonStyle" }
        ]
      }]
    }

    menu.toggle($event)
  }



  navigateToTheMainPage() {
    this.router.navigate(['grocery-list']);
    this.displayNavigator = false
  }

  valuechange($event: any) {
    //this.searchInput.searchInputIs($event)
  }
}
