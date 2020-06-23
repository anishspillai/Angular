export class OrderDeliveryStatus {
  constructor(public deliveryStatus: string,
              public desiredDeliveryDate: number,
              public actualDeliveryDate: number,
              public commentsFromCustomer: string ="",
              public commentsFromMallOfGroceries: string ="") {
  }
}
