import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";
import {GroceryResponse, IndividualGrocery} from "./individual-grocery/model/IndividualGrocery";
import {map} from "rxjs/operators";
import {IndividualGroceryComponent} from "./individual-grocery/individual-grocery-component";
import {Order} from "./individual-grocery/model/Order";
import {MenuItem} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MallOfShopping';
  items: Observable<any[]>;
  anish: IndividualGrocery[] = [new IndividualGrocery()]
  kooi: IndividualGrocery[] = []
  nonFilteredList: IndividualGrocery[] = []

  orderedList: Order[] = []


seen:[] = []

  navigationSubscription;


  constructor(firestore: AngularFireDatabase, private readonly router: Router) {
    this.seen = []

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
      /**firestore.list('admin/Catagories').valueChanges().forEach(value => value.forEach(value1 => {


        for (let val of Object.values(value1)) {

          this.kooi = val;

          this.kooi.forEach(value2 => {
            var anish: IndividualGrocery = value2 as IndividualGrocery
            this.anish.push(anish)
            console.log(anish.actualPrice)
            this.nonFilteredList.push(anish)
          })
        }
          }
      ))*/

  }

  initialiseInvites() {
    if (localStorage.getItem('foo')) {
      location.reload()
      localStorage.removeItem('foo')
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
  }

  callMe(): void {
    alert(this.orderedList.length)
  }

  filterProduct(searchString: string) {
    this.anish = this.nonFilteredList.filter(value => value.brandName.toLowerCase().includes(searchString.toLowerCase()))
  }
}
