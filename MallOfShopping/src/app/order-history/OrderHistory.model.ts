import {Order} from "../individual-grocery/model/Order";
import {UserDetailsModel} from "../user-details/model/user.details.model";

export class OrderHistoryModel {
  orderedTimestamp: string
  orderHistory: Order[] = []
}

export class AdminOrderHistories {
  userId: string
  orderHistory: OrderHistoryModel[] = []
  userDetails: UserDetailsModel
}
