import {Component, Input, OnInit} from '@angular/core';
import {GroceryService} from "../grocery-grid/grocery.service";
import {AdminOrderHistories, Anish, OrderHistoryModel} from "./OrderHistory.model";
import {AuthService} from "../auth/auth.service";
import {DatePipe} from "@angular/common";
import {Order} from "../individual-grocery/model/Order";
import {mergeMap} from "rxjs/operators";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {of} from "rxjs";
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {UserDetailsService} from "../user-details/user.details.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  providers: [DatePipe]
})
export class OrderHistoryComponent  {

  @Input() isMobileDevice: false

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


  filteredDate : Date

  _userId = ""

  @Input()
  public set userId(userId: string) {
    this.isLoadingFinished = false
    this._userId = userId;
    //this.ngOnInit();
  }

  constructor(private readonly groceryService: GroceryService,
              readonly authService: AuthService,
              private readonly datePipe: DatePipe,
              private readonly userDetailsService: UserDetailsService,
              private readonly http: HttpClient) {
    //this.ngOnInit()
  }


  ngOnInit() {

    this.orderHistory = []

    if (true) {

      // @ts-ignore
      this.groceryService.getOrderHistory(this._userId).subscribe(value => {

          value.forEach(childSnapshot => {

            // @ts-ignore
            let kooi: Anish = new Anish()
            // @ts-ignore
            kooi = childSnapshot.payload.val()


            let anish: OrderHistoryModel = new OrderHistoryModel()
            // @ts-ignore
            anish.userId = childSnapshot.payload.val().userId
            // @ts-ignore
            anish.dateInNumber = childSnapshot.payload.val().currentTimestamp
            // @ts-ignore
            anish.orderHistory = childSnapshot.payload.val().order
            anish.orderedTimestamp = this.getFormattedDateTime(parseInt(String(anish.dateInNumber)))
            this.orderHistory.push(anish)



            console.log('kooi is ' + JSON.stringify(anish.orderedTimestamp))
            //console.log(JSON.stringify(childSnapshot.payload.val().userId))


// @ts-ignore
            /**childSnapshot.val().forEach(test => {

              let anish: OrderHistoryModel = new OrderHistoryModel()

              anish.userId = childSnapshot.key

              anish.orderKey= test.key
              anish.dateInNumber = parseInt(test.key)
              anish.orderedTimestamp = this.getFormattedDateTime(parseInt(test.key))

              const  orders: Order[] = []


              let kooi: Anish = new Anish()
              // @ts-ignore
              kooi = test.val()
              console.log('kooi is ' + JSON.stringify(kooi))

              // @ts-ignore
              /**test.val().forEach(value => {
                // @ts-ignore
                orders.push(value)
              })
              anish.orderHistory = orders
              this.orderHistory.push(anish)
            })*/

          })

        this.filteredorderHistory = this.orderHistory

        }
      )


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
   try {
     return this.datePipe.transform(new Date(parseInt(dateTimeInNumberFormat.toString())),
       'MMM d, y, h:mm:ss a')
   } catch (e) {
     return ""
   }
  }

  testApi() {
    this.http.get('/api/users').subscribe((data:any) => {

      console.log("Hello")
      alert(JSON.stringify(data))
    });
  }

  filterData() {


    let nextDay: Date = this.filteredDate
    nextDay.setDate(this.filteredDate.getDate() + 1)

    console.log(JSON.stringify(this.filteredDate))
    console.log(JSON.stringify(nextDay))


    this.filteredorderHistory = this.orderHistory.
filter(value => value.dateInNumber >= this.filteredDate.getTime())

    // @ts-ignore
    this.filteredorderHistory = this.filteredorderHistory.
    sort((n1,n2)=> n1.dateInNumber > n2.dateInNumber ? 1 : -1)


  }


  getUserDetails(userId) {


     this.userDetailsModel = new UserDetailsModel()

    this.userDetailsService.getUserDetails(userId).subscribe(value => {

      if (value && value.length != 0) {
        this.userDetailsModel.postNumber = value[4] as string
        this.userDetailsModel.streetName = value[5] as string
        this.userDetailsModel.apartmentNo = value[1] as string
        this.userDetailsModel.telephoneNumber = value[6] as string
        this.userDetailsModel.telephoneNumber = value[6] as string
        this.userDetailsModel.firstName = value[2] as string
        this.userDetailsModel.lastName = value[3] as string
        this.userDetailsModel.address = value[0] as string
      }
      this.viewUserDetails = true
    }, (error) => {
      console.log(error)
    })
  }

  userDetailsModel: UserDetailsModel
  viewUserDetails = false

}
