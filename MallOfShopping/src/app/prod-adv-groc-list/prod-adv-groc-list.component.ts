import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Router} from "@angular/router";
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery";

@Component({
  selector: 'app-prod-adv-groc-list',
  templateUrl: './prod-adv-groc-list.component.html',
  styleUrls: ['./prod-adv-groc-list.component.css']
})
export class ProdAdvGrocListComponent implements OnInit {

  newProducts: IndividualGrocery[] = []

  constructor(private readonly firestore: AngularFireDatabase, private readonly router: Router) {
  }

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

  navigateTo(url: string) {
    if(url === 'products') {
      this.router.navigate(['new-items-list'])
    } else {
      this.router.navigate(['offer-page'])
    }
  }

}
