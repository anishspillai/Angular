import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";

@Component({
  selector: 'app-new-products-list',
  templateUrl: './new-products-list.component.html',
  styleUrls: ['./new-products-list.component.css']
})
export class NewProductsListComponent implements OnInit {

  constructor(private readonly firestore: AngularFireDatabase,
              private addGroceryToListObservableService: AddGroceryToListObservableService) { }

  newProducts: IndividualGrocery[] = []


  carouselArray: any[] = []

  ngOnInit(): void {
    this.firestore.list('admin/New_Products').snapshotChanges().subscribe(value => {
        value.forEach(dataSnapshot => {
          // @ts-ignore
          const individualGrocery: IndividualGrocery = dataSnapshot.payload.val()
          individualGrocery.id = dataSnapshot.key
          this.newProducts.push(individualGrocery)
          },
        )
        this.listToMatrix(3);
      }, error => {
        console.log('Error in getting new products ' + error)
      }
    )
  }

  listToMatrix(elementsPerSubArray) {
    let i, k;

    for (i = 0, k = -1; i < this.newProducts.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        this.carouselArray[k] = [];
      }

      this.carouselArray[k].push(this.newProducts[i]);
    }
  }

  checkItemAlreadyAddedInCart(individualGrocery: IndividualGrocery) {
    return this.addGroceryToListObservableService.orders.find(element => element.id == individualGrocery.id) == null
  }

  goBackToPreviousPage() {
    window.history.back();
  }
}
