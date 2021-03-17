import {Component, Input, OnInit} from '@angular/core';
import {GroceryService} from "../grocery-grid/grocery.service";
import {AdminOrderHistories, Anish, OrderHistoryModel, PaymentDetails} from "./OrderHistory.model";
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


  startDate : Date

  endDate : Date


  _userId = ""

  paymentDetails: PaymentDetails = new PaymentDetails()

  currentUserId: string
  currentOrderHistory: Order[]
  showBillingPage: boolean = false
  totalAmount: number;
  orderedDateTime: string

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

      // @ts-ignore
      /**this.groceryService.getOrderHistory(this._userId).pipe(mergeMap(value => {

          value.forEach(childSnapshot => {

            // @ts-ignore
            let kooi: Anish = new Anish()
            // @ts-ignore
            kooi = childSnapshot.payload.val()


            let anish: OrderHistoryModel = new OrderHistoryModel()
            // @ts-ignore
            anish.userId = childSnapshot.payload.val().userId
            // @ts-ignore
            anish.dateInNumber = childSnapshot.payload.val().orderPlacementTime
            // @ts-ignore
            anish.orderHistory = childSnapshot.payload.val().order
            // @ts-ignore
            anish.orderedTimestamp = this.getFormattedDateTime(childSnapshot.payload.val().orderPlacementTime)

            anish.orderKey = childSnapshot.key

            this.orderHistory.push(anish)

            this.groceryService.getDeliveryDateAndStatus(anish.userId, String(anish.dateInNumber)).subscribe(value => {
              if (value && value.length != 0) {
                console.log(JSON.stringify(value))
                const orderDeliveryStatus = new OrderDeliveryStatus("", 0, 0,
                  value[1] as string, value[2] as string)
                anish.orderDeliveryStatus = orderDeliveryStatus
              }
            })

          })
          return of('')
        }
      )).subscribe(() => {
          //this.orderHistory.reverse()
          this.filteredorderHistory = this.orderHistory
        this.filteredorderHistory.reverse()
        }
      )*/


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
    if(orderHistoryModel.orderHistory) {
      return this.groceryService.getTotalCostOfOrderedItems(orderHistoryModel.orderHistory)
    } else {
      return 0
    }
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

   try {
     return this.datePipe.transform(new Date(parseInt(dateTimeInNumberFormat.toString())),
       'MMM d, y, h:mm:ss a')
   } catch (e) {
     return ""
   }
  }

  testApi() {
    this.http.get('/api/users').subscribe((data:any) => {

      alert(JSON.stringify(data))
    });
  }


  getTotal() {
    this.totalAmount = 0;
    this.filteredorderHistory.forEach(value => {
      this.totalAmount += this.getTotalCostOfTheOrder(value)
    })
  }


  filterData() {


    // @ts-ignore
    this.groceryService.getOrderHistoryFilteredByDate(this.startDate.getTime(), this.endDate.getTime()).pipe(mergeMap(value => {

      this.filteredorderHistory = []


      value.forEach(childSnapshot => {

          let anish: OrderHistoryModel = new OrderHistoryModel()
          // @ts-ignore
          anish.userId = childSnapshot.payload.val().userId
          // @ts-ignore
          anish.dateInNumber = childSnapshot.payload.val().orderPlacementTime
          // @ts-ignore
          anish.orderHistory = childSnapshot.payload.val().order

          anish.orderKey = childSnapshot.key

          anish.orderedTimestamp = this.getFormattedDateTime(parseInt(String(anish.dateInNumber)))
          this.filteredorderHistory.push(anish)

          this.groceryService.getDeliveryDateAndStatus(anish.userId, String(anish.dateInNumber)).subscribe(value => {
            if (value && value.length != 0) {
              // @ts-ignore
              const orderDeliveryStatus = new OrderDeliveryStatus("", 0, 0, value[1].payload, "")
              anish.orderDeliveryStatus = orderDeliveryStatus
              anish.commentsSection = JSON.stringify(value)
            }
          })

        this.getUserDetails(anish.userId, anish);

        })
        return of('')
      }
    )).subscribe(() => {
        //this.orderHistory.reverse()
        this.filteredorderHistory.reverse()
      }
    )



  }


  getUserDetails(userId, anish: OrderHistoryModel) {


     const userDetailsModel = new UserDetailsModel()

    this.userDetailsService.getUserDetails(userId).subscribe(value => {

      if (value && value.length != 0) {
        userDetailsModel.postNumber = value[4] as string
        userDetailsModel.streetName = value[5] as string
        userDetailsModel.apartmentNo = value[1] as string
        userDetailsModel.telephoneNumber = value[6] as string
        userDetailsModel.telephoneNumber = value[6] as string
        userDetailsModel.firstName = value[2] as string
        userDetailsModel.lastName = value[3] as string
        userDetailsModel.address = value[0] as string
        anish.userDetailsModel = userDetailsModel
      }
    }, (error) => {
      console.log(error)
    })
  }

  displayUserDetails( anish: OrderHistoryModel) {
    this.userDetailsModel = anish.userDetailsModel
    this.viewUserDetails = true
  }

  userDetailsModel: UserDetailsModel
  viewUserDetails = false
  displayPaymentDetails: boolean;

  setAtDelivered(oh: OrderHistoryModel) {
     this.groceryService.setAsDelivered(oh.orderKey)
  }

  displayBillingPage(oh: OrderHistoryModel) {
    this.currentUserId = oh.userId
    this.currentOrderHistory = oh.orderHistory
    this.showBillingPage = true
    this.orderedDateTime = oh.orderedTimestamp
  }

  fetchPaymentDetails(userId:string, dateInNumber: number) {
    this.groceryService.getPaymentDetails(userId, String(dateInNumber)).subscribe(value => {
      this.displayPaymentDetails = true
      if(!value || value.length == 0) {
        this.paymentDetails = new PaymentDetails()
        this.paymentDetails.userId = userId
        this.paymentDetails.orderedTimestamp = dateInNumber
        this.paymentDetails.userId_orderPlacementTime = userId + "_" + dateInNumber
      } else {
        this.paymentDetails  = value[0].payload.val() as PaymentDetails
      }
    })
  }

  storePaymentDetails() {
    this.paymentDetails.paymentStatus = this.paymentDetails.paymentStatusString.startsWith("Y")
    this.groceryService.updatePaymentDetails(this.paymentDetails).then(() => this.displayPaymentDetails = false).catch(reason => alert('Payment details updation failed ' + reason))
  }
}
