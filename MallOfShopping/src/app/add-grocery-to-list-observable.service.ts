import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "./individual-grocery/model/Order";
import {consoleTestResultHandler} from "tslint/lib/test";

@Injectable({
  providedIn: 'root'
})
export class AddGroceryToListObservableService {

  private _orders = new BehaviorSubject<Order[]>([])
  orders: Order[] = []

  getOrders() {
    return this._orders.asObservable()
  }

  emptyCart() {
    this.orders = []
    this.notifySubscribers()
  }

  addGroceryToTheOrderList(order: Order) {
    this.orders.push(order)
    this.notifySubscribers()
  }

  incrementNoOfItems(noOfItems: number, id: string): void {
    this.updateCountOfItems(noOfItems, id)
  }

  decrementNoOfItems(noOfItems: number, id: string): void {

    if (noOfItems == 1) {
      this.orders = this.orders.filter(value => value.id != id)
      this.notifySubscribers()
    } else {
      this.updateCountOfItems(noOfItems, id)
    }
  }

  private updateCountOfItems(noOfItems: number, id: string) {
    const individualGroceryFromOrderedList = this.orders.find(element => element.id == id)
    individualGroceryFromOrderedList.noOfItems = noOfItems
    this.notifySubscribers()
  }

  public notifySubscribers() {
    this._orders.next(this.orders)
  }

  public getTotalAmount() {
    console.log(this.orders)
    return this.orders
      .reduce((sum, current) => sum + (current.noOfItems * current.actualPrice), 0);
  }
}
