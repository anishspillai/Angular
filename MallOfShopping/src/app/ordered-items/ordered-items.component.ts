import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../individual-grocery/model/Order";
import {GroceryService} from "../grocery-grid/grocery.service";

@Component({
  selector: 'app-ordered-items',
  templateUrl: './ordered-items.component.html',
  styleUrls: ['./ordered-items.component.css']
})
export class OrderedItemsComponent implements OnInit {

  @Input() orders: Order[]
  @Input() totalCost

  constructor(private readonly groceryService: GroceryService) { }

  ngOnInit(): void {
  }

  getCostOfIndividualOrder(order: Order) {
    return this.groceryService.getSumOfGrocery(order).toFixed(2)
  }

}
