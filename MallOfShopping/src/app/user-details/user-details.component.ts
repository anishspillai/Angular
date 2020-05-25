import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from "./user.details.service";
import {UserDetailsModel} from "./model/user.details.model";
import {User} from "firebase";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {OrderHistoryModel} from "../order-history/OrderHistory.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetailsModel: UserDetailsModel = new UserDetailsModel()
  user: User

  displayErrorDialog: boolean = false

  items: Observable<any[]>;


  constructor(private readonly  userDetailsService: UserDetailsService,
              private readonly authService: AuthService) {
  }

  displayEditUserDialog = false


  ngOnInit(): void {

    this.user = this.authService.getUser()

    if (this.user) {
      this.fetchUserDetails()
    }

  }

  fetchUserDetails() {

    this.userDetailsService.getUserDetails(this.user.uid).subscribe(value => {

      if(value.length != 0) {
        this.userDetailsModel.postNumber = value[4] as string
        this.userDetailsModel.streetName = value[5] as string
        this.userDetailsModel.apartmentNo = value[1] as string
        this.userDetailsModel.telephoneNumber = value[6] as string
        this.userDetailsModel.firstName = value[2] as string
        this.userDetailsModel.lastName = value[3] as string
        this.userDetailsModel.address = value[0] as string
      }

    })



      /**.subscribe(value => {

      value.forEach(childSnapshot => {

        console.log(childSnapshot)
        this.userDetailsModel = childSnapshot.payload.val()[0]
        console.log("hi "+ this.userDetailsModel)

      })
    })*/
  }


  storeUserDetails(): void {


    if(this.userDetailsModel.firstName.length == 0
      || this.userDetailsModel.telephoneNumber.length == 0
      || this.userDetailsModel.apartmentNo.length == 0
      || this.userDetailsModel.streetName.length == 0
      || this.userDetailsModel.postNumber.length == 0) {
      this.displayErrorDialog = true
      return
    }

    this.userDetailsService.saveUserDetails(this.userDetailsModel, this.user.uid).then(() => {
      this.displayEditUserDialog = false
      this.fetchUserDetails()
    })
      .catch(err => {
        this.userDetailsModel = new UserDetailsModel()
        alert("Sorry, the user details cannot be saved now.")
      });
  }
}
