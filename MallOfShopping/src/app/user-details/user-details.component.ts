import {Component, Input, OnInit} from '@angular/core';
import {UserDetailsService} from "./user.details.service";
import {UserDetailsModel} from "./model/user.details.model";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {ErrorLogService} from "../error-log.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [ErrorLogService]
})
export class UserDetailsComponent implements OnInit {

  userDetailsModel: UserDetailsModel = new UserDetailsModel()
  user: string
  items: Observable<any[]>;
  displayEditUserDialog = false
  displayErrorMessage = false
  @Input() displayHeader = true

  constructor(private readonly  userDetailsService: UserDetailsService,
              private readonly authService: AuthService,
              private readonly errorLogService: ErrorLogService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser()
    if (this.user) {
      this.fetchUserDetails()
    }
  }

  fetchUserDetails() {

    this.displayErrorMessage  = false

    this.userDetailsService.getUserDetails(this.user).subscribe(value => {

      if (value && value.length != 0) {
        this.userDetailsModel.postNumber = value[4] as string
        this.userDetailsModel.streetName = value[5] as string
        this.userDetailsModel.apartmentNo = value[1] as string
        this.userDetailsModel.telephoneNumber = value[6] as string
        this.userDetailsModel.firstName = value[2] as string
        this.userDetailsModel.lastName = value[3] as string
        this.userDetailsModel.address = value[0] as string
      }
    }, (error) => {
        this.displayErrorMessage = true
        this.errorLogService.logErrorMessage(this.user, error)
    })
  }
}
