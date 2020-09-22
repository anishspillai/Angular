import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  @Input() mainGroceryType: string
  @Input() subGroceryType: string
  @Input() isSubMenu: string


  ngOnInit(): void {
  }

}
