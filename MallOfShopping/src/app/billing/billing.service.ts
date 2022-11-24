import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {Order} from "../individual-grocery/model/Order";
import {DeliveredOrderedDetails} from "./model/DeliveredOrderedDetails";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  sendEmail(name, email, message) {
    const uri = 'http://localhost:8000/api/sendEmail';
    const obj = {
      name: name,
      email: email,
      message: message,
    };
    return this.http.post(uri, obj);
  }

  sendDeliveredOrderToTheCustomer(userDetail: UserDetailsModel, orderHistory: Order[]) {
    console.log("GOing into")
    const uri = 'http://ec2-13-53-187-185.eu-north-1.compute.amazonaws.com:8080/sendEmail';
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const obj = {
      userDetailsModel: JSON.stringify(userDetail),
      order: JSON.stringify(orderHistory)
    };

    const deliveredOrderedDetails: DeliveredOrderedDetails = new DeliveredOrderedDetails(userDetail, orderHistory);

    return this.http.post(uri, JSON.stringify(deliveredOrderedDetails), {headers: headers}).subscribe(value => {
      console.log(value)
    });
  }
}
