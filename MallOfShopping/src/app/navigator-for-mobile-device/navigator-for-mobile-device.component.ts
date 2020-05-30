import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigator-for-mobile-device',
  templateUrl: './navigator-for-mobile-device.component.html',
  styleUrls: ['./navigator-for-mobile-device.component.css']
})
export class NavigatorForMobileDeviceComponent implements OnInit {

  @Input() displaySideBarMenuItemForMobileApplication: boolean

  @Output() closeSideBarMenuItemForMobileApplication = new EventEmitter()


  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  sendCloseEvent() {
    this.closeSideBarMenuItemForMobileApplication.emit(false)
  }

  navigateToTheMainPage() {
    this.router.navigate(['grocery-list']);
    this.displaySideBarMenuItemForMobileApplication = false
  }



}
