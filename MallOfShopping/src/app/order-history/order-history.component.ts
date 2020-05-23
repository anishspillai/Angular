import {Component, OnInit, ViewChild} from '@angular/core';
import {GroceryService} from "../grocery-grid/grocery.service";
import {OrderHistoryModel} from "./OrderHistory.model";
import {Order} from "../individual-grocery/model/Order";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{

  orderHistory: OrderHistoryModel[] = []




  public cars: Car[];
  public datasource: Car[];
  public totalRecords: number = 100;
  public loading: boolean;
  public selectedColumns: any[];
  public cols: any[];
  public colors: any[];
  public brands: any[];
  public columnOptions: any[];
  private colsTempor: any[] = [];

  constructor(private readonly groceryService: GroceryService,
              readonly authService: AuthService) { }

  ngOnInit() {

    const user = this.authService.getUser()

    this.groceryService.getOrderHistory(user.uid).subscribe(value =>
      {
        value.forEach(childSnapshot => {

          const orderHistoryComponent:  OrderHistoryModel = new OrderHistoryModel()

          // @ts-ignore
          childSnapshot.payload.val().forEach(value => {
            orderHistoryComponent.orderedTimestamp = new Date(parseInt(childSnapshot.key)).toString()

            orderHistoryComponent.orderHistory.push(value)
          })

          this.orderHistory.push(orderHistoryComponent)
        })
      }
    )



    this.cols = [
      { field: 'groceryName', header: 'Brand Name', index: 1 },
      { field: 'type', header: 'Type', index: 2 },
      { field: 'grossWeight', header: 'Weight', index: 3 },
      { field: 'unitOfWeight', header: 'Unit', index: 4 },
      { field: 'noOfItems', header: 'No Of Items', index: 4 },
      { field: 'price', header: 'Cost', index: 4 }
    ];

    this.brands = [
      { label: 'All Brands', value: null },
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];



  }
}

export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}
