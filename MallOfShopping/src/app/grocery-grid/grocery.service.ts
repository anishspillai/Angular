import {Injectable} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import {Order} from "../individual-grocery/model/Order";

@Injectable()
export class GroceryService {

  constructor(private readonly angularFireDatabase: AngularFireDatabase) {
  }

  placeOrderForTheUser(order: Order[], userId: string) {
    const currentTimeStamp = new Date().getTime()
    return this.angularFireDatabase.object("/users/order-lists/" + userId + "/" + currentTimeStamp).set(order)
  }

  getOrderHistory(userId: string) {
    return this.angularFireDatabase.list('users/order-lists/' + userId).snapshotChanges()
  }

}
