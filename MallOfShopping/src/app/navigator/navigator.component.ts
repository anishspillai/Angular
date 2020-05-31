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


  constructor(
    private readonly navigatorService: NavigatorService,
    private readonly router: Router,
    private readonly breadCrumbService: BreadCrumbService
  ) {
  }

  ngOnInit(): void {
    //this.fetchNavigationItems()
  }

  fetchNavigationItems(): void {

    this.navigatorService.fetchCategories().subscribe(snapshots => {
      snapshots.forEach(childSnapshot => {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.payload;


        if (!Array.isArray(childData.val())) {

          let menuItem: GroceryMenuItem = new GroceryMenuItem(childData.val())
          this.menuItems.push(menuItem)
        } else {
          {
            let menuItem: GroceryMenuItem = new GroceryMenuItem(childData.key)
            this.menuSubItems = []
            childData.val().forEach(childData => {
              let menuItem: GroceryMenuItem = new GroceryMenuItem(childData)
              this.menuSubItems.push(menuItem)
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


    this.router.navigate(['/grocery-list'], {queryParams: {groceryType: item.label + '/' + item.label}}).then(r => console.log(r));
    this.breadCrumbService.updateBreadCrumb([{label: item.label}])
  }

  navigateToGrocerySubMenu(item: GroceryMenuItem, subItem) {

    if(this.isMobileDevice) {
      this.triggerEventForClosingNavigationForMobileApp()
    }

    this.router.navigate(['/grocery-list'], {queryParams: {groceryType: item.label + '/' + subItem.label}}).then(r => console.log(r));
    this.breadCrumbService.updateBreadCrumb([ {label: item.label}, {label: subItem.label} ])
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


}
