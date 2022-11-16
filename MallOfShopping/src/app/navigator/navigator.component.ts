import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NavigatorService} from "./navigator.service";
import {GroceryMenuItem} from "./model/GroceryMenuItem";
import {Router} from "@angular/router";
import {BreadCrumbService} from "../bread-crumb/bread-crumb.service";
import {SlideMenu} from "primeng/slidemenu";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent  {

  menuItems: GroceryMenuItem[]
  menuItems_With_Out: GroceryMenuItem[]

  menuSubItems: GroceryMenuItem[] = []

  expandSubMenuItems: Boolean = false

  expandableListElements: String[] = []

  @Input() isMobileDevice = false

  @Output() closeNavigationDialogForMobApp = new EventEmitter()

  @Input() visibleSidebar1

  items: GroceryMenuItem[];

  slideMenu: SlideMenu

  constructor(
    private readonly navigatorService: NavigatorService,
    private readonly router: Router,
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
      this.menuItems = []
      this.menuItems_With_Out = []
      snapshots.forEach(childSnapshot => {

        const childData = childSnapshot.payload;

        if (!Array.isArray(childData.val())) {
          let menuItem: GroceryMenuItem = new GroceryMenuItem(childData.val())
          menuItem.items = []
          menuItem.command = () => { this.closeParentWindowAndSlideMenuForChildWindowForDesktopDevices() }
          this.menuItems_With_Out.push(menuItem)
        } else {
          {
            let menuItem: GroceryMenuItem = new GroceryMenuItem(childData.key)
            //menuItem.routerLink = "grocery-list"
            const queryParam =  'groceryType=' + menuItem.label
            menuItem.queryParams = [queryParam]
            this.menuSubItems = []
            childData.val().forEach(childData => {
              let subMenuItem: GroceryMenuItem = new GroceryMenuItem(childData)
              subMenuItem.routerLink = "grocery-list"
              subMenuItem.queryParams = {'groceryType': subMenuItem.label , 'subMenu': 'true', 'main': menuItem.label}
              subMenuItem.command = (onclick) => {this.closeParentWindowAndSlideMenuForChildWindowForMobileDevices()}
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

    if(item.items.length == 0) {

      if(this.slideMenu) {
        this.slideMenu.toggle(true)
      }

      this.triggerEventForClosingNavigationForMobileApp()
    }


    this.router.navigate(['/grocery-list'], {queryParams: {groceryType: item.label}})
  }

  // I was using ahref for <a> tag for navigating to the specific grocery. But it was reloading the page always.
  // To stop that, I removed the ahref and added the router.navigate methoda
  navigateToTheGroceryItemClickedByUser(subItemLabel: string, itemLabel: string) {
    this.router.navigate(['/grocery-list'], {queryParams: {groceryType: subItemLabel, subMenu: true, main : itemLabel}})
  }

  closeParentWindowAndSlideMenuForChildWindowForMobileDevices() {
    if(!this.isMobileDevice) {
      //this.slideMenu.toggle(false)  // The slideMenu was not closing even after closing the parent window. It was embarassing situation.
      this.triggerEventForClosingNavigationForMobileApp() // Close the side bar for mobile application
    }
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
    this.router.navigate(['/home-page'])
  }

  toggleSlideMenu($event: MouseEvent, menu: SlideMenu) {
    this.slideMenu = menu
    menu.toggle($event)
  }

  navigateToTheMainPage() {
    if(this.slideMenu) {
      this.slideMenu.toggle(false)
    }
    this.router.navigate(['/home-page'])
    this.triggerEventForClosingNavigationForMobileApp()
  }

  private closeParentWindowAndSlideMenuForChildWindowForDesktopDevices() {
    if(!this.isMobileDevice) {
      //this.slideMenu.toggle(false)  // The slideMenu was not closing even after closing the parent window. It was embarassing situation.
      this.triggerEventForClosingNavigationForMobileApp() // Close the side bar for mobile application
    }
  }

  encodeUri(label: string) {
    return encodeURIComponent(label)
  }
}
