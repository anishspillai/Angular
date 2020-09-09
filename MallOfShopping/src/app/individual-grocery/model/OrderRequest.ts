import {Order} from "./Order";

export class OrderRequest {
  userId: string
  orderPlacementTime: string
  order: Order[]
  deliveryStatus: number
}
