import {Injectable} from "@angular/core";
import {MenuItem} from "primeng/api";

@Injectable()
export class BreadCrumbService {

  home: MenuItem =  {icon: 'pi pi-home', url : 'first-component'};
  items: MenuItem[]

  updateBreadCrumb(menuItems: MenuItem[]) {
    this.items = menuItems
  }

  getMenuItems() {
    return this.items
  }
}
