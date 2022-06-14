import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";
import {NavigationEnd, Router} from "@angular/router";
import {AddGroceryToListObservableService} from "./add-grocery-to-list-observable.service";
import {BnNgIdleService} from "bn-ng-idle";
import {AuthService} from "./auth/auth.service";
import {UserDetailsService} from "./user-details/user.details.service";
import {Order} from "./individual-grocery/model/Order";
import {GroceryService} from "./grocery-grid/grocery.service";
import {SearchObservableServiceService} from "./search-observable-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  items: Observable<any[]>;
  navigationSubscription;
  isDesktopDevice: boolean

  displayInfoDialog = false
  displayScrollToTop = false
  displayLoginPage =  false;
  userName: string
  displaySideMenuBar: boolean = false

  ordersAddedByUser: Order[] = []
  searchString: string

  displayMenuItems: boolean = false

  url: string;

  constructor(private readonly firestore: AngularFireDatabase,
              private readonly router: Router,
              private readonly addGroceryToListObservableService: AddGroceryToListObservableService,
              private readonly bnIdle: BnNgIdleService,
              readonly authService: AuthService,
              private readonly groceryService: GroceryService,
              private readonly userDetailsService: UserDetailsService,
              private readonly searchInput: SearchObservableServiceService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.url = e.url; // To hide menu items ( dal, flour etc ) for not required pages ( order confirmation, order history etc )
        this.initialiseInvites();
      }
    });

  }


  initialiseInvites() {
    if (localStorage.getItem('no-reload')) {
      location.reload()
      localStorage.removeItem('no-reload')
    } else {
      this.addGroceryToListObservableService.refillDataFromLocalStorageAndNotify()
    }
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.isDesktopDevice = window.innerWidth > 768

    this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        if(window.location.pathname.endsWith("/grocery-list")) {
          window.location.reload()
        }
      }
    });

    this.getUserDetails()

    this.addGroceryToListObservableService.getOrders().subscribe(value => {
      this.ordersAddedByUser = value
    })

  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.displayScrollToTop = window.pageYOffset > 10 ? true : false
  }

  closeNavigator() {
    this.displayMenuItems = false
  }

  logOut() {
    this.authService.logout().then(r => console.log(r))
  }

  getUserDetails() {
    this.userDetailsService.getUserDetails(this.authService.getUser()).subscribe(value => this.userName = value[2] as string )
  }

  getCostOfItem() {
    return this.groceryService.getTotalCostOfOrderedItems(this.ordersAddedByUser).toFixed(2)
  }

  getCountOfItems() {

    const sum = this.ordersAddedByUser.reduce((sum, current) =>
      sum + current.noOfItems, 0)

    return sum
  }

  proceedToNextPage() {
    if(this.authService.isLoggedIn) {
      this.displaySideMenuBar = true
    } else {
      this.logIn()
    }
  }

  valueChange($event: string) {
    this.searchInput.triggerNotification($event)
    this.router.navigate(['/grocery-list'])
  }

  toggleSideBarButton() {
    this.displayMenuItems = true
  }

  logIn() {
    this.displayLoginPage = true
  }

  displayGroceryMenuItems(): boolean{
    if(this.url && (this.url.includes("grocery-list") || this.url === '/') || this.url.includes("home-page")) {
      return true;
    }
    return false;
  }
}
