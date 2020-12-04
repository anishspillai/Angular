import {BehaviorSubject} from "rxjs";

export class SearchObservableServiceService {

  private _orders = new BehaviorSubject<string>("")

  triggerNotification(searchText: string) {
    this._orders.next(searchText)
  }

  getSearchObservable() {
    return this._orders
  }

}
