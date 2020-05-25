import {Injectable} from "@angular/core";
import {MenuItem} from "primeng/api";

@Injectable()
export class BreadCrumbService {

  items: MenuItem[]

  updateBreadCrumb(menuItems: MenuItem[]) {
    this.items = menuItems
  }

  getMenuItems() {
    return this.items
  }
}
