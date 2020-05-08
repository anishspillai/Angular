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
    this.items = [
      {label: 'Categories'},
      {label: 'Sports'},
      {label: 'Football'},
      {label: 'Countries'},
      {label: 'Spain'},
      {label: 'F.C. Barcelona'},
      {label: 'Squad'},
      {label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link'}
    ];

    this.home = {icon: 'pi pi-home', url : 'first-component'};
  }

  navigateToPage(menuItem: MenuItem) {
    console.log(menuItem)
    this.router.navigate([menuItem.url]).then(r => console.log(r));
  }

  getItems() {
    return this.breadCrumbService.getMenuItems()
  }
}
