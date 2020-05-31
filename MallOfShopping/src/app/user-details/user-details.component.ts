import {Component, Input, OnInit} from '@angular/core';
import {UserDetailsService} from "./user.details.service";
import {UserDetailsModel} from "./model/user.details.model";
import {User} from "firebase";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetailsModel: UserDetailsModel = new UserDetailsModel()
  user: User
  items: Observable<any[]>;
  displayEditUserDialog = false
  @Input() isMobileDevice: false


  constructor(private readonly  userDetailsService: UserDetailsService,
              private readonly authService: AuthService) {
  }

  ngOnInit(): void {

    this.user = this.authService.getUser()
    if (this.user) {

      this.fetchUserDetails()
    }

  }

  fetchUserDetails() {

    this.userDetailsService.getUserDetails(this.user.uid).subscribe(value => {

      if (value && value.length != 0) {
        this.userDetailsModel.postNumber = value[4] as string
        this.userDetailsModel.streetName = value[5] as string
        this.userDetailsModel.apartmentNo = value[1] as string
        this.userDetailsModel.telephoneNumber = value[6] as string
        this.userDetailsModel.firstName = value[2] as string
        this.userDetailsModel.lastName = value[3] as string
        this.userDetailsModel.address = value[0] as string
      }
    })
  }
}
