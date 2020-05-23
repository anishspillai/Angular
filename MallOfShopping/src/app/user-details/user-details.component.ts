import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from "./user.details.service";
import {UserDetailsModel} from "./model/user.details.model";
import {User} from "firebase";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetailsModel: UserDetailsModel = new UserDetailsModel()
  user: User

  displayErrorDialog: boolean = false

  constructor(private readonly  userDetailsService: UserDetailsService,
              private readonly authService: AuthService) {
  }

  displayBasic = false


  ngOnInit(): void {

    this.user = this.authService.getUser()

    if (this.user) {
      this.userDetailsService.getUserDetails(this.user.uid).subscribe(value => {
        value.forEach(childSnapshot => {
          this.userDetailsModel = childSnapshot.payload.val()[0]
        })
      })
    }

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
  }
}
