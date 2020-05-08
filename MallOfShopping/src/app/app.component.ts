import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";
import {GroceryResponse, IndividualGrocery} from "./individual-grocery/model/IndividualGrocery";
import {map} from "rxjs/operators";
import {IndividualGroceryComponent} from "./individual-grocery/individual-grocery-component";
import {Order} from "./individual-grocery/model/Order";
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MallOfShopping';
  items: Observable<any[]>;
  anish: IndividualGrocery[] = [new IndividualGrocery()]
  kooi: IndividualGrocery[] = []
  nonFilteredList: IndividualGrocery[] = []

  orderedList: Order[] = []


seen:[] = []

  constructor(firestore: AngularFireDatabase) {
    this.seen = []


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

  callMe(): void {
    alert(this.orderedList.length)
  }

  filterProduct(searchString: string) {
    this.anish = this.nonFilteredList.filter(value => value.brandName.toLowerCase().includes(searchString.toLowerCase()))
  }
}
