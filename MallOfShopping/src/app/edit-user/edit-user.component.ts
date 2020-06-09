import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {UserDetailsService} from "../user-details/user.details.service";
import {AuthService} from "../auth/auth.service";
import {ErrorLogService} from "../error-log.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [ErrorLogService]
})
export class EditUserComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  @Input() userDetailsModel: UserDetailsModel

  @Input() displayEditUserDialog: boolean

  @Output() closeEditUserDialog = new EventEmitter()

  @Input() userId: string

  displayErrorMessage = false

  constructor(private readonly formBuilder: FormBuilder,
              private readonly  userDetailsService: UserDetailsService,
              private readonly authService: AuthService,
              private readonly errorLogService: ErrorLogService) {
  }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephoneNumber: ['', [Validators.required, Validators.pattern("^\\d{10}$")]],
      apartmentNo: ['', Validators.required],
      streetName: ['', Validators.required],
      postNumber: ['', [Validators.required, , Validators.pattern("^\\d{5}$")]]
    });

    this.registerForm.patchValue(this.userDetailsModel)

    /**this.registerForm.value.firstName = this.userDetailsModel.firstName
    this.registerForm.value.lastName = this.userDetailsModel.lastName
    this.registerForm.value.telephoneNumber = this.userDetailsModel.telephoneNumber
    this.registerForm.value.apartmentNo = this.userDetailsModel.apartmentNo
    this.registerForm.value.streetName = this.userDetailsModel.apartmentNo
    this.registerForm.value.postNumber = this.userDetailsModel.postNumber*/
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true

    this.displayErrorMessage = false

    if (this.registerForm.invalid) {
      return;
    }

    const userDetailsModel = new UserDetailsModel(this.registerForm.value.address,
                                                  this.registerForm.value.apartmentNo,
                                                  this.registerForm.value.firstName,
                                                  this.registerForm.value.lastName,
                                                  this.registerForm.value.postNumber,
                                                  this.registerForm.value.streetName,
                                                  this.registerForm.value.telephoneNumber)

    this.userDetailsService.saveUserDetails(userDetailsModel, this.authService.getUser()).then(() => {
      this.sendCloseEvent()
    })
      .catch(error => {
        this.displayErrorMessage = true
        this.errorLogService.logErrorMessage(this.userId, error)
        this.sendCloseEvent()
      });
  }

  sendCloseEvent() {
    this.closeEditUserDialog.emit(false)
  }
}
