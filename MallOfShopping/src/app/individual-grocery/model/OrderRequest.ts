import {Order} from "./Order";

export class OrderRequest {
  userId: string
  orderPlacementTime: number
  order: Order[]
  deliveryStatus: number
}
