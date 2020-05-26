import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  items: Observable<any[]>;
  navigationSubscription;

  constructor(private readonly firestore: AngularFireDatabase,
              private readonly router: Router) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

  }

  initialiseInvites() {
    if (localStorage.getItem('foo')) {
      location.reload()
      localStorage.removeItem('foo')
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
  }
}
