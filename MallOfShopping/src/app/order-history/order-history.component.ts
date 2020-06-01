import {Component, Input, OnInit} from '@angular/core';
import {GroceryService} from "../grocery-grid/grocery.service";
import {OrderHistoryModel} from "./OrderHistory.model";
import {AuthService} from "../auth/auth.service";
import {DatePipe} from "@angular/common";
import {Order} from "../individual-grocery/model/Order";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  providers: [DatePipe]
})
export class OrderHistoryComponent implements OnInit {

  @Input() isMobileDevice: false

  orderHistory: OrderHistoryModel[] = []

  public totalRecords: number = 100;
  public loading: boolean;
  public cols: any[];
  public cols_mobile_apps: any[];

  constructor(private readonly groceryService: GroceryService,
              readonly authService: AuthService,
              private readonly datePipe: DatePipe) {
  }

  ngOnInit() {

    const user = this.authService.getUser()

    if (user) {
      this.groceryService.getOrderHistory(user.uid).subscribe(value => {
          value.forEach(childSnapshot => {

            const orderHistoryComponent: OrderHistoryModel = new OrderHistoryModel()

            // @ts-ignore
            childSnapshot.payload.val().forEach(value => {
              orderHistoryComponent.orderedTimestamp = this.datePipe.transform(new Date(parseInt(childSnapshot.key)),
                'MMM d, y, h:mm:ss a')

              orderHistoryComponent.orderHistory.push(value)
            })

            this.orderHistory.push(orderHistoryComponent)
          })
        }
      )

    }

    this.cols = [
      {field: 'groceryName', header: 'Brand Name', index: 1},
      {field: 'type', header: 'Type', index: 2},
      {field: 'grossWeight', header: 'Weight', index: 3},
      {field: 'unitOfWeight', header: 'Unit', index: 4},
      {field: 'noOfItems', header: 'No Of Items', index: 4},
      {field: 'price', header: 'Cost', index: 4}
    ];


    this.cols_mobile_apps = [
      { header: 'Order' },
      { header: 'Weight' },
      { header: 'Cost' }
    ];

  }

  getTotalCostOfTheOrder(orderHistoryModel: OrderHistoryModel) {
    return this.groceryService.getTotalCostOfOrderedItems(orderHistoryModel.orderHistory)
  }

  getIndividualCostOfItem(order: Order) {
    return this.groceryService.getSumOfGrocery(order)
  }
}
