import {Component, OnInit, ViewEncapsulation} from '@angular/core';
//import {MenuItem, MessageService} from "primeng";
import {MenuItem} from "primeng/api";
import {MessageService} from "primeng/api";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-order-confirmation-wizard',
  templateUrl: './order-confirmation-wizard.component.html',
  providers: [MessageService],
  styleUrls: ['./order-confirmation-wizard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderConfirmationWizardComponent implements OnInit {

  items: MenuItem[];

  activeIndex: number = 0;

  constructor(private messageService: MessageService, private readonly router: Router) {}

  cancelThisPage() {

    this.router.navigate(['first-component']);
  }

  placeOrder() {
    //const user: User = JSON.parse(localStorage.getItem('user'))
    //this.groceryService.placeOrderForTheUser(this.ordersAddedByUser, user.uid)



    this.router.navigate(['order-confirmation']);

  }
  ngOnInit() {
    this.items = [{
      label: 'Personal',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
    },
      {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
        }
      },
      {
        label: 'Payment',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
        }
      },
      {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
        }
      }
    ];
  }
}
