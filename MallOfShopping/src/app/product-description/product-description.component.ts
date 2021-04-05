import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery";
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {Router} from "@angular/router";
import {GroceryService} from "../grocery-grid/grocery.service";
import {ProductDescriptionService} from "./product-description.service";
import {ProductDescription} from "../individual-grocery/model/ProductDescription";

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  @Input() individualGrocery: IndividualGrocery

  @Output() closeProductDescriptionPage = new EventEmitter()

  @Input() displayProductDetailsDialog: boolean

  @Input() isDesktopApplication: boolean

  productDescription: ProductDescription

  constructor( private readonly productDescriptionService: ProductDescriptionService) {
  }

  ngOnInit(): void {
    this.productDescriptionService.getProductDescription(this.individualGrocery.id).subscribe(
      value => {
        value.forEach(value1 => this.productDescription = value1.payload.val() as ProductDescription)
      })
  }

  closeThisDialog() {
      this.closeProductDescriptionPage.emit(false)
  }

  isWebsiteLinkPresent() {
    if(this.productDescription) {
      return this.productDescription.actualWebsiteLink !== "\"\""
    }
  }

  isAllergicInformationPresent() {
    if(this.productDescription) {
      return this.productDescription.allergyInformation !== "\"\""
    }
  }

  isNutrientsInformationPresent() {
    if(this.productDescription) {
      return this.productDescription.nutrients !== "\"\""
    }
  }
}
