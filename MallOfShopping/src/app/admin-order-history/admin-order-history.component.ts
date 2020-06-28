import { Component, OnInit } from '@angular/core';
import {AdminOrderHistories} from "../order-history/OrderHistory.model";
import {GroceryService} from "../grocery-grid/grocery.service";
import {AuthService} from "../auth/auth.service";
import {DatePipe} from "@angular/common";
import {mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {UserDetailsService} from "../user-details/user.details.service";

@Component({
  selector: 'app-admin-order-history',
  templateUrl: './admin-order-history.component.html',
  styleUrls: ['./admin-order-history.component.css']
})
export class AdminOrderHistoryComponent implements OnInit {

  constructor(private readonly groceryService: GroceryService,
              readonly authService: AuthService, private readonly  userDetailsService: UserDetailsService) {
  }

  ngOnInit(): void {

    this.getOrderHistoryForAdmin()
  }

  displayOrderDetails = false

  previousUserId = ""

  userId = ""

  adminOrderHis : AdminOrderHistories[] = []

  getOrderHistoryForAdmin() {

    this.groceryService.getOrderHistoriesForAdmin().pipe(mergeMap(value => {
      this.adminOrderHis = []
        value.forEach(childSnapshot => {


          const adminOrderHistories: AdminOrderHistories = new AdminOrderHistories()


          adminOrderHistories.userId = childSnapshot.key

          let userDetailsModel: UserDetailsModel = new UserDetailsModel()

          this.userDetailsService.getUserDetails(childSnapshot.key).subscribe(value => {

            if (value && value.length != 0) {
              userDetailsModel.postNumber = value[4] as string
              userDetailsModel.streetName = value[5] as string
              userDetailsModel.apartmentNo = value[1] as string
              userDetailsModel.telephoneNumber = value[6] as string
              userDetailsModel.firstName = value[2] as string
              userDetailsModel.lastName = value[3] as string
              userDetailsModel.address = value[0] as string

              adminOrderHistories.userDetails = userDetailsModel
            }
          }, (error) => {
            console.log(error)
          })
          this.adminOrderHis.push(adminOrderHistories)
        })
        return of('')
      }
    )).subscribe(() => console.log(""))

  }

  launchPage(userId: string) {
    this.previousUserId = this.userId
    this.userId = userId
    this.displayOrderDetails = true
  }
}
