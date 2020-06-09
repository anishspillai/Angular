import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-private-policies',
  templateUrl: './private-policies.component.html',
  styleUrls: ['./private-policies.component.css']
})
export class PrivatePoliciesComponent implements OnInit{

  constructor() { }

  @Input() displayPrivacyPolicyDialog: boolean;

  isDesktopApplication: boolean = true;

  @Output() closePrivacyDialog = new EventEmitter()


  triggerEventForClosingDialog() {
    this.closePrivacyDialog.emit(false)
  }

  ngOnInit(): void {
    this.isDesktopApplication = window.innerWidth > 768
  }
}
