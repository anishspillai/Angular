import {Component, Input, OnInit} from '@angular/core';
import {GroceryService} from "../grocery-grid/grocery.service";
import {OrderHistoryModel} from "./OrderHistory.model";
import {AuthService} from "../auth/auth.service";
import {DatePipe} from "@angular/common";
import {Order} from "../individual-grocery/model/Order";
import {mergeMap} from "rxjs/operators";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {of} from "rxjs";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";

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

  enableEditComment = false
  commentsFromCustomer = ""

  isSmallWindow = false

  viewCommentsFromTheAdmin = false

  viewDeliveryScheduleView = false

  editExistingOrder = false

  currentHistoryModel: OrderHistoryModel

  constructor(private readonly groceryService: GroceryService,
              readonly authService: AuthService,
              private readonly datePipe: DatePipe,
              private readonly addGroceryToListObservableService: AddGroceryToListObservableService) {
  }

  ngOnInit() {

    const user: string = this.authService.getUser()

    if (user) {
      // @ts-ignore
      this.groceryService.getOrderHistory(user).pipe(mergeMap(value => {
          value.forEach(childSnapshot => {

            let keyOfOrder = ""

            const orderHistoryComponent: OrderHistoryModel = new OrderHistoryModel()

            // @ts-ignore
            //childSnapshot.payload.val().forEach(value => {


            keyOfOrder = childSnapshot.payload.val().orderPlacementTime

            orderHistoryComponent.orderKey = keyOfOrder

            // @ts-ignore
            orderHistoryComponent.orderedTimestamp = this.datePipe.transform(new Date(parseInt(childSnapshot.payload.val().orderPlacementTime)),
              'MMM d, y, h:mm:ss a')

            // @ts-ignore
            orderHistoryComponent.orderHistory = childSnapshot.payload.val().order

            // @ts-ignore
            orderHistoryComponent.deliveryStatus = childSnapshot.payload.val().deliveryStatus
            //})

            this.orderHistory.push(orderHistoryComponent)


            this.groceryService.getDeliveryDateAndStatus(user, keyOfOrder).subscribe(value => {
              if (value && value.length != 0) {
                const orderDeliveryStatus = new OrderDeliveryStatus(value[3] as string, value[4] as number, value[0] as number,
                  value[1] as string, value[2] as string)
                orderHistoryComponent.orderDeliveryStatus = orderDeliveryStatus
              }
            })

          })
          return of('')
        }
      )).subscribe(() => {
        this.orderHistory.reverse()
      })

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
      {header: 'Order'},
      {header: 'Weight'},
      {header: 'Cost'}
    ];

  }

  getTotalCostOfTheOrder(orderHistoryModel: OrderHistoryModel) {
    return this.groceryService.getTotalCostOfOrderedItems(orderHistoryModel.orderHistory)
  }

  getIndividualCostOfItem(order: Order) {
    return this.groceryService.getSumOfGrocery(order)
  }

  editComment(orderHistoryModel: OrderHistoryModel) {
    this.currentHistoryModel = orderHistoryModel
    this.commentsFromCustomer = orderHistoryModel.orderDeliveryStatus.commentsFromCustomer
    this.enableEditComment = true
  }

  viewAdminComments(orderHistoryModel: OrderHistoryModel) {
    this.currentHistoryModel = orderHistoryModel
    this.viewCommentsFromTheAdmin = true
  }

  viewDeliverySchedule(orderHistoryModel: OrderHistoryModel) {
    this.currentHistoryModel = orderHistoryModel
    this.viewDeliveryScheduleView = true
  }

  editCommentForSmallDevice(orderHistoryModel: OrderHistoryModel) {
    this.isSmallWindow = true
    this.editComment(orderHistoryModel)
  }

  updateUserComments() {
    const user: string = this.authService.getUser()
    this.groceryService.updateUserComments(user, this.currentHistoryModel.orderKey, this.commentsFromCustomer).then(() => this.enableEditComment = false)
  }

  getFormattedDateTime(dateTimeInNumberFormat: number): string {
    if (!dateTimeInNumberFormat || dateTimeInNumberFormat === 0) {
      return "No proposal date and time"
    }
    return this.datePipe.transform(new Date(parseInt(dateTimeInNumberFormat.toString())),
      'MMM d, y, h:mm:ss a')
  }

  populateCartWithThisOrder(): void {
    localStorage.setItem("crypto_vadakkedathu", this.currentHistoryModel.orderKey)
    this.addGroceryToListObservableService.populateCartFromTheHistory(this.currentHistoryModel.orderHistory)
    this.editExistingOrder = false
  }

  enableEditingExistingOrder(oh: OrderHistoryModel) {
    this.currentHistoryModel = oh
    this.editExistingOrder = true
  }
}
