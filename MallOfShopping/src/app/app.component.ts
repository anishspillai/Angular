import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";
import {NavigationEnd, Router} from "@angular/router";
import {AddGroceryToListObservableService} from "./add-grocery-to-list-observable.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  items: Observable<any[]>;
  navigationSubscription;
  isDesktopDevice: boolean

  displayInfoDialog = false
  displayScrollToTop = false


  constructor(private readonly firestore: AngularFireDatabase,
              private readonly router: Router,
              private readonly addGroceryToListObservableService: AddGroceryToListObservableService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

  }

  initialiseInvites() {
    if (localStorage.getItem('no-reload')) {
      location.reload()
      localStorage.removeItem('no-reload')
    } else {
      this.addGroceryToListObservableService.refillDataFromLocalStorageAndNotify()
    }
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.isDesktopDevice = window.innerWidth > 768
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.displayScrollToTop = window.pageYOffset > 10 ? true : false
  }
}
