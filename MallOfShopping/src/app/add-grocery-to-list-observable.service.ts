import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "./individual-grocery/model/Order";
import * as CryptoJS from 'crypto-js';
// @ts-ignore
import { LZString } from './lz-string';
import {AngularFireDatabase} from "@angular/fire/database";
import {GroceryService} from "./grocery-grid/grocery.service";
import {AuthService} from "./auth/auth.service";



@Injectable({
  providedIn: 'root'
})
export class AddGroceryToListObservableService {

  constructor(private readonly groceryService: GroceryService,
              private readonly authService: AuthService) {
  }

  private _orders = new BehaviorSubject<Order[]>([])
  orders: Order[] = []

  getOrders() {
    return this._orders.asObservable()
  }

  emptyCart() {
    this.orders = []
    this.groceryService.emptyShoppingCart(this.authService.getUser()).then(r => console.log(""))
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

    /**const shoppingCartKey = localStorage.getItem("cart_key")
    if(!shoppingCartKey) {
      let key = this.groceryService.createShoppingCart()
      localStorage.setItem("cart_key", key)
      this.groceryService.addToTheShoppingCart(key, this.orders).then(r => console.log(""))
    } else {
        this.groceryService.addToTheShoppingCart(shoppingCartKey, this.orders).then(r => console.log(""))
    }*/

    this.groceryService.addToTheShoppingCart(this.authService.getUser(), this.orders).then(r => console.log(""))

    this._orders.next(this.orders)
  }

  public refillDataFromLocalStorageAndNotify() {
    if(this.orders.length == 0) {
      this.groceryService.getOrdersFromTheShoppingCart(this.authService.getUser()).subscribe(value => {
        // @ts-ignore
        this.orders = value
        this._orders.next(this.orders)
        }
      )
    }
  }
}
