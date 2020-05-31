import {Order} from "../individual-grocery/model/Order";

export class OrderHistoryModel {
  orderedTimestamp: string
  orderHistory: Order[] = []

  public getTotalAmount() {
    return this.orderHistory
      .reduce((sum, current) => sum + (current.noOfItems * current.actualPrice), 0);
  }
}
