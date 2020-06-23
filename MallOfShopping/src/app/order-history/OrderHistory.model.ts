import {Order} from "../individual-grocery/model/Order";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";

export class OrderHistoryModel {
  orderedTimestamp: string
  orderHistory: Order[] = []
  orderDeliveryStatus: OrderDeliveryStatus
  orderKey: string

}
