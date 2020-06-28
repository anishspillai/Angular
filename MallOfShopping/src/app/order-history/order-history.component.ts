import {Component, Input, OnInit} from '@angular/core';
import {GroceryService} from "../grocery-grid/grocery.service";
import {AdminOrderHistories, OrderHistoryModel} from "./OrderHistory.model";
import {AuthService} from "../auth/auth.service";
import {DatePipe} from "@angular/common";
import {Order} from "../individual-grocery/model/Order";
import {mergeMap} from "rxjs/operators";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {of} from "rxjs";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  providers: [DatePipe]
})
export class OrderHistoryComponent  {

  @Input() isMobileDevice: false

  orderHistory: OrderHistoryModel[] = []

  adminOrderHistories: AdminOrderHistories[] = []

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

  _userId = ""

  @Input()
  public set userId(userId: string) {
    this.isLoadingFinished = false
    this._userId = userId;
    this.ngOnInit();
  }

  constructor(private readonly groceryService: GroceryService,
              readonly authService: AuthService,
              private readonly datePipe: DatePipe) {
    this.ngOnInit()
  }


  ngOnInit() {

    this.orderHistory = []

    if (this._userId) {

      // @ts-ignore
      this.groceryService.getOrderHistory(this._userId).pipe(mergeMap(value => {
          value.forEach(childSnapshot => {

            let keyOfOrder = ""

            const orderHistoryComponent: OrderHistoryModel = new OrderHistoryModel()

            // @ts-ignore
            childSnapshot.payload.val().forEach(value => {


              keyOfOrder = childSnapshot.key

              orderHistoryComponent.orderKey = keyOfOrder

              orderHistoryComponent.orderedTimestamp = this.datePipe.transform(new Date(parseInt(childSnapshot.key)),
                'MMM d, y, h:mm:ss a')

              orderHistoryComponent.orderHistory.push(value)
            })

            this.orderHistory.push(orderHistoryComponent)

            this.groceryService.getDeliveryDateAndStatus(this._userId, keyOfOrder).subscribe(value => {
              if (value && value.length != 0) {
                const orderDeliveryStatus = new OrderDeliveryStatus(value[3] as string, value[4] as number, value[0] as number,
                  value[1] as string, value[2] as string)
                orderHistoryComponent.orderDeliveryStatus = orderDeliveryStatus
                this.isLoadingFinished = true
              }
          })

          })
        return of('')
        }
      )).subscribe(() => console.log(""))


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
  }

  getOrderHistories(user: string, orderHistory: OrderHistoryModel[]) {
    this.groceryService.getOrderHistory(user).subscribe(value => {
        value.forEach(childSnapshot => {

          const orderHistoryComponent: OrderHistoryModel = new OrderHistoryModel()

          // @ts-ignore
          childSnapshot.payload.val().forEach(value => {
            orderHistoryComponent.orderedTimestamp = this.datePipe.transform(new Date(parseInt(childSnapshot.key)),
              'MMM d, y, h:mm:ss a')

            orderHistoryComponent.orderHistory.push(value)
          })

          orderHistory.push(orderHistoryComponent)
        })
      }
    )
  }

  getOrderHistoryForAdmin() {

    this.groceryService.getOrderHistoriesForAdmin().subscribe(value => {
      value.forEach(childSnapshot => {
        const adminOrderHistories: AdminOrderHistories = new AdminOrderHistories()
        adminOrderHistories.userId = childSnapshot.key
        this.getOrderHistories(childSnapshot.key, adminOrderHistories.orderHistory)
        this.adminOrderHistories.push(adminOrderHistories)
      })
    })

  }

  getTotalCostOfTheOrder(orderHistoryModel: OrderHistoryModel) {
    return this.groceryService.getTotalCostOfOrderedItems(orderHistoryModel.orderHistory)
  }

  getIndividualCostOfItem(order: Order) {
    return this.groceryService.getSumOfGrocery(order)
  }

  editComment(orderHistoryModel: OrderHistoryModel) {
    this.currentHistoryModel = orderHistoryModel

    this.commentsFromMallOfGroceries = orderHistoryModel.orderDeliveryStatus.commentsFromMallOfGroceries
    this.viewCommentsFromTheAdmin = true
  }

  addHistory(orderHistoryModel: OrderHistoryModel) {

    if(!orderHistoryModel.orderDeliveryStatus) {
      const orderDeliveryStatus: OrderDeliveryStatus = new OrderDeliveryStatus("Delivered",
        0, 0, "", "")

      this.groceryService.addOrderHistory(this._userId, orderDeliveryStatus, orderHistoryModel.orderKey).then(() => console.log(""))
    }

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

  updateMallOfGroceriesComments() {

    this.groceryService.updateAdminComment(this._userId, this.currentHistoryModel.orderKey,
      this.commentsFromMallOfGroceries, this.deliveryDate, this.deliveryStatus).then(() => this.enableEditComment = false)
  }



  getFormattedDateTime(dateTimeInNumberFormat: number) : string {
    if(!dateTimeInNumberFormat || dateTimeInNumberFormat === 0) {
      return "No proposal date and time"
    }

    console.log(dateTimeInNumberFormat)
   return  this.datePipe.transform(new Date(parseInt(dateTimeInNumberFormat.toString())),
      'MMM d, y, h:mm:ss a')
  }
}
