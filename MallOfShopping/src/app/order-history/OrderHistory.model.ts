import {Order} from "../individual-grocery/model/Order";
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";

export class OrderHistoryModel {
  order: Order[] = []
  orderedTimestamp: string
  orderHistory: Order[] = []
  orderDeliveryStatus: OrderDeliveryStatus
  orderKey: string
  userId: string
  dateInNumber: Number
  commentsSection: string
  userDetailsModel: UserDetailsModel
  orderPlacementTime: number
}

export class AdminOrderHistories {
  userId: string
  orderHistory: OrderHistoryModel[] = []
  userDetails: UserDetailsModel
}

export class Anish {
  currentTimestamp: number
  order: Order[] = []
  userId: string
}


export class PaymentDetails {
  userId: string
  orderedTimestamp: number
  paymentStatus: boolean
  paymentStatusString: string
  totalAmount: number
  paymentMode = "Swish"
  commentAboutPayment: string
  userId_orderPlacementTime: string
}



export class VeggiesCount {
  Jack: number = 0
  mangoPak: number = 0
  bottle: number = 0
  bitter: number = 0
  brinjal: number = 0
  ladiesFinger: number = 0
  onion: number = 0
  banana: number = 0
  mango: number = 0
  guava: number = 0
  valpapadi: number = 0
  arvi: number = 0
  alphonso: number = 0
  curryLeaves: number = 0
  pumpkin: number = 0
  drum: number = 0
  amla: number = 0
  methi: number = 0
  tindora: number = 0
  snake: number = 0
  chilli: number = 0;
  jackFruit: number = 0;
}
