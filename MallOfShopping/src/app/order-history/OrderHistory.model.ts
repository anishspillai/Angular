import {Order} from "../individual-grocery/model/Order";

export class OrderHistoryModel {
  orderedTimestamp: string
  orderHistory: Order[] = []
}
