import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {BreadCrumbService} from "./bread-crumb.service";

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;

  constructor(private readonly router: Router,
              private readonly breadCrumbService: BreadCrumbService) {
  }

  ngOnInit() {
    this.home = {label: 'home'};
  }

  navigateToPage($event) {
    if($event.item.label == "home" ) {
      this.router.navigate(['first-component']).then(r => console.log(r));
    }
  }

  getItems() {
    return this.breadCrumbService.getMenuItems()
  }
}
