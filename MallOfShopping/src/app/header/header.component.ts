import {Component, OnInit} from "@angular/core";
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {User} from "firebase";
import {AuthService} from "../auth/auth.service";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {Order} from "../individual-grocery/model/Order";
import {GroceryService} from "../grocery-grid/grocery.service";
import {BreadCrumbService} from "../bread-crumb/bread-crumb.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private applicationComponent: AppComponent
  private router: Router
  private auth: AuthService
  private addGroceryToListObservableService: AddGroceryToListObservableService

  searchString: string

  cities: City[];

  cars: Cars[];

  selectedCity: City;

  selectedCities: City[];

  selectedCar: string = 'BMW';

  ordersAddedByUser: Order[] = []


  constructor(appComponent: AppComponent,
              router: Router,
              auth: AuthService,
              addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly groceryService: GroceryService,
              private readonly breadCrumbService: BreadCrumbService) {
    this.applicationComponent = appComponent
    this.router = router
    this.auth = auth
    this.addGroceryToListObservableService = addGroceryToListObservableService


    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];


    this.cars = [
      {label: 'My Details', value: 'user-details'},
      {label: 'Order History', value: 'order-history'},
      {label: 'Favorites', value: 'Favorites'}
    ];

  }

  ngOnInit(): void {
    this.addGroceryToListObservableService.getOrders().subscribe(value => {
      this.ordersAddedByUser = value
    })
  }

  filterProduct(): void {
    this.applicationComponent.filterProduct(this.searchString)
  }

  navigateToThePage(car: Cars) {
    this.router.navigate([car.value]);
    this.breadCrumbService.updateBreadCrumb([{label: car.label}])
  }

  logIn() {
    console.log(this.ordersAddedByUser)
    console.log(new Date().toLocaleTimeString())
    this.router.navigate(['log-in']);
  }

  logOut() {
    console.log(this.ordersAddedByUser)
    this.auth.logout().then(r => console.log(r))
  }

  getUser(): string {
    const user: User = JSON.parse(localStorage.getItem('user'))
    if (user == null) {
      return 'Hello, Log-in'
    }
    return user.email
  }

  isLoggedIn(): Boolean {
    return this.auth.isLoggedIn
  }

  getCostOfItems() {
    const sum = this.ordersAddedByUser.reduce((sum, current) => sum + (current.price * current.noOfItems), 0);
    return sum
  }

  getCountOfItems() {
    return this.ordersAddedByUser.length
  }

  placeOrder() {
    const user: User = JSON.parse(localStorage.getItem('user'))
    const anish = new Date().getTime()
    console.log(anish)
    console.log(new Date(anish).toString())

    this.groceryService.placeOrderForTheUser(this.ordersAddedByUser, user.uid)
  }

}
  export
  class
  City {
  name: string
  code: string
}

export class Cars {
  label: string
  value: string
}
