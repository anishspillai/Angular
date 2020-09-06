import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NavigatorService} from "./navigator.service";
import {GroceryMenuItem} from "./model/GroceryMenuItem";
import {ActivatedRoute, Router} from "@angular/router";
import {BreadCrumbService} from "../bread-crumb/bread-crumb.service";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent  {

  menuItems: GroceryMenuItem[] = []

  menuSubItems: GroceryMenuItem[] = []

  expandSubMenuItems: Boolean = false

  expandableListElements: String[] = []

  @Input() isMobileDevice = false

  @Output() closeNavigationDialogForMobApp = new EventEmitter()

  items: GroceryMenuItem[];

  constructor(
    private readonly navigatorService: NavigatorService,
    private readonly router: Router,
    private readonly breadCrumbService: BreadCrumbService
  ) {
  }

  ngOnInit(): void {
    this.fetchNavigationItems()
  }

  getViewPort(item: GroceryMenuItem) {

    if(item.items.length == 2) {
      return item.items.length * 60
    } else if (item.items.length == 1) {
      return 80
    }

    return item.items.length * 50
  }



  fetchNavigationItems(): void {

    this.navigatorService.fetchCategories().subscribe(snapshots => {
      snapshots.forEach(childSnapshot => {

        const childData = childSnapshot.payload;

        if (!Array.isArray(childData.val())) {
          let menuItem: GroceryMenuItem = new GroceryMenuItem(childData.val())
          menuItem.items = []
          this.menuItems.push(menuItem)
        } else {
          {
            let menuItem: GroceryMenuItem = new GroceryMenuItem(childData.key)
            menuItem.routerLink = "grocery-list"
            const queryParam =  'groceryType=' + menuItem.label
            menuItem.queryParams = [queryParam]
            this.menuSubItems = []
            childData.val().forEach(childData => {
              let subMenuItem: GroceryMenuItem = new GroceryMenuItem(childData)
              subMenuItem.routerLink = "grocery-list"
              subMenuItem.queryParams = {'groceryType': subMenuItem.label , 'subMenu': 'true'}
              this.menuSubItems.push(subMenuItem)
            })
            menuItem.items = this.menuSubItems
            this.menuItems.push(menuItem)
          }
        }
      });
    });
  }

  isSubMenuOpened(item: GroceryMenuItem) {
    if(item.items.length > 0) {
      this.expandSubMenuItems = !this.expandSubMenuItems
    }
  }

  navigateToSubMenu($event: MouseEvent) {
    console.log()
  }

  navigateToGroceryMain(item: GroceryMenuItem) {

    if(this.isMobileDevice && item.items.length == 0) {
      this.triggerEventForClosingNavigationForMobileApp()
    }


    this.router.navigate(['/grocery-list'], {queryParams: {groceryType: item.label}})
    //this.breadCrumbService.updateBreadCrumb([{label: item.label}])
  }

  navigateToGrocerySubMenu(item: GroceryMenuItem, subItem) {

    if(this.isMobileDevice) {
      this.triggerEventForClosingNavigationForMobileApp()
    }

    this.router.navigate(['/grocery-list'], {queryParams: {groceryType: item.label + '/' + subItem.label}})
    //this.breadCrumbService.updateBreadCrumb([ {label: item.label}, {label: subItem.label} ])
  }

  expandListBox(label: string) {
    const index = this.expandableListElements.indexOf(label)
    if (index == -1) {
      this.expandableListElements.push(label)
    } else {
      this.expandableListElements.splice(index, 1)
    }
  }

  displayDropDown(label: string) {
    const index = this.expandableListElements.indexOf(label)
    return index > -1
  }


  triggerEventForClosingNavigationForMobileApp() {
    this.closeNavigationDialogForMobApp.emit(false)
  }


  navigateToHomePage() {
    this.router.navigate(['/grocery-list'])
  }
}
