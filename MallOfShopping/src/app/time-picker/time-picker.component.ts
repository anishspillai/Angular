import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ng-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  constructor() { }

  desiredDeliveryDate: Date

  @Input() isDesktopApplication = true

  @Output() closeCalenderEventEmitter = new EventEmitter()

  ngOnInit(): void {
  }

  getTomorrow() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }

  dispatchEvent() {
    console.log(this.desiredDeliveryDate)
    this.closeCalenderEventEmitter.emit(this.desiredDeliveryDate)
  }

}
