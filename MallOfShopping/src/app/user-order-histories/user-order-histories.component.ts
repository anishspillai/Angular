import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminOrderHistories, OrderHistoryModel, PaymentDetails} from "../order-history/OrderHistory.model";
import {Order} from "../individual-grocery/model/Order";
import {GroceryService} from "../grocery-grid/grocery.service";
import {AuthService} from "../auth/auth.service";
import {DatePipe} from "@angular/common";
import {UserDetailsService} from "../user-details/user.details.service";
import {HttpClient} from "@angular/common/http";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {UserDetailsModel} from "../user-details/model/user.details.model";

@Component({
  selector: 'app-user-order-histories',
  templateUrl: './user-order-histories.component.html',
  styleUrls: ['./user-order-histories.component.css']
})
export class UserOrderHistoriesComponent implements OnInit {

  @Input() isMobileDevice: false

  @Input() userId: string

  orderHistory: OrderHistoryModel[] = []

  filteredorderHistory: OrderHistoryModel[] = []

  adminOrderHistories: AdminOrderHistories[] = []

  orders: Order[] = []

  public totalRecords: number = 100;
  public loading: boolean;
  public cols: any[];
  public cols_mobile_apps: any[];

  enableEditComment = false
  commentsFromCustomer = ""

  isSmallWindow = false

  viewCommentsFromTheAdmin = false

  viewDeliveryScheduleView = false

  currentHistoryModel: OrderHistoryModel

  isLoadingFinished = false

  commentsFromMallOfGroceries = ""
  deliveryStatus = ""
  deliveryDate : Date


  startDate : Date

  endDate : Date

  paymentDetails: PaymentDetails = new PaymentDetails()

  currentUserId: string
  currentOrderHistory: Order[]
  showBillingPage: boolean = false
  totalAmount: number;
  orderedDateTime: string

  @Output() closeLoginDialogEvent = new EventEmitter()

  constructor(private readonly groceryService: GroceryService,
              readonly authService: AuthService,
              private readonly datePipe: DatePipe,
              private readonly userDetailsService: UserDetailsService,
              private readonly http: HttpClient) {
    //this.ngOnInit()
  }


  ngOnInit() {

    this.orderHistory = []

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

    this.getOrderHistories(this.userId)

  }

  getOrderHistories(user: string) {

    this.groceryService.getOrderHistory(user).subscribe(value => {

      value.forEach(childSnapshot => {


        let anish: OrderHistoryModel = childSnapshot.payload.val()
        anish.orderedTimestamp = this.datePipe.transform(anish.orderPlacementTime)

this.filteredorderHistory.push(anish)



        // @ts-ignore
        /**childSnapshot.payload.val().forEach(value => {
          orderHistoryComponent.orderedTimestamp = this.datePipe.transform(new Date(parseInt(childSnapshot.key)),
            'MMM d, y, h:mm:ss a')

          orderHistoryComponent.orderHistory.push(value)
        })*/

      })
      }
    )

  }

  closeDialog() {
    this.closeLoginDialogEvent.emit(false)
  }

  getTotalCostOfTheOrder(orderHistoryModel: OrderHistoryModel) {
    if(orderHistoryModel.order) {
      return this.groceryService.getTotalCostOfOrderedItems(orderHistoryModel.order)
    } else {
      return 0
    }
  }

  getIndividualCostOfItem(order: Order) {
    return this.groceryService.getSumOfGrocery(order)
  }



  getFormattedDateTime(dateTimeInNumberFormat: number) : string {
    if(!dateTimeInNumberFormat || dateTimeInNumberFormat === 0) {
      return "No proposal date and time"
    }

    try {
      return this.datePipe.transform(new Date(parseInt(dateTimeInNumberFormat.toString())),
        'MMM d, y, h:mm:ss a')
    } catch (e) {
      return ""
    }
  }
}
