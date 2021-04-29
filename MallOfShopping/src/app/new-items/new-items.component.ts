import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery";

@Component({
  selector: 'app-new-items',
  templateUrl: './new-items.component.html',
  styleUrls: ['./new-items.component.css']
})
export class NewItemsComponent implements OnInit {

  newProducts: IndividualGrocery[] = []

  constructor(private readonly firestore: AngularFireDatabase) {
  }

  carouselArray: any[] = []

  ngOnInit(): void {
    this.firestore.list('admin/New_Products').snapshotChanges().subscribe(value => {
        value.forEach(dataSnapshot => {
            // @ts-ignore
            this.newProducts.push(dataSnapshot.payload.val())
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
}
