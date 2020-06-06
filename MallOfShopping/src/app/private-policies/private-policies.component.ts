import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-private-policies',
  templateUrl: './private-policies.component.html',
  styleUrls: ['./private-policies.component.css']
})
export class PrivatePoliciesComponent {

  constructor() { }
  @Input() displayBasic: boolean;

  @Output() closePrivacyDialog = new EventEmitter()


  triggerEventForClosingDialog() {
    this.closePrivacyDialog.emit(false)
  }

}
