import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Order} from "../individual-grocery/model/Order";

@Injectable()
export class GroceryService {

  constructor(private readonly angularFireDatabase: AngularFireDatabase) {
  }

  placeOrderForTheUser(order: Order[], userId: string) {
    //this.groceryHistory = this.angularFireDatabase.list('/users/order-lists');
    const currentTimeStamp = new Date().getTime()
    console.log(userId)
    return this.angularFireDatabase.object("/users/order-lists/" + userId + "/" + currentTimeStamp).set(order)
  }

  getOrderHistory(userId: string) {
    return this.angularFireDatabase.list('users/order-lists/' + userId).snapshotChanges()
  }

}
