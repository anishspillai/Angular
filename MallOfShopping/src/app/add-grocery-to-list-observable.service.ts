import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "./individual-grocery/model/Order";

@Injectable({
  providedIn: 'root'
})
export class AddGroceryToListObservableService {
  private _orders = new BehaviorSubject<Order[]>([])
  private orders: Order[] = []

  getOrders() {
    return this._orders.asObservable()
  }

  addGroceryToTheOrderList(order: Order) {
    this.orders.push(order)
    this._orders.next(this.orders)
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
    const individualGroceryFromOrderedList = this.orders.find(element => element.id = id)
    individualGroceryFromOrderedList.noOfItems = noOfItems
    this.notifySubscribers()
  }

  private notifySubscribers() {
    console.log(this.orders)
    this._orders.next(this.orders)
  }
}
