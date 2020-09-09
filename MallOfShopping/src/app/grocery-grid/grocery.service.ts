import {Injectable} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import {Order} from "../individual-grocery/model/Order";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {OrderRequest} from "../individual-grocery/model/OrderRequest";

@Injectable()
export class GroceryService {

  constructor(private readonly angularFireDatabase: AngularFireDatabase) {
  }

  createShoppingCart() {
    //https://doorstep-groceries.firebaseapp.com/?category=bread
    //https://github.com/kavalakuntla/Online-Grocery-Store
    // https://codelabs.developers.google.com/codelabs/firebase-web/?fbclid=IwAR2FBNNmHcOdtYpkcDMFR8U0eMiEZVrbcksK8ej75kuxnA_JkpYdmCK_Qfg#0
    return this.angularFireDatabase.list("/users/shopping-cart").push({dateCreated: new Date().getTime()}).key
  }

  addToTheShoppingCart(key: string, order: Order[]) {
    //https://doorstep-groceries.firebaseapp.com/?category=bread
    //https://github.com/kavalakuntla/Online-Grocery-Store
    return this.angularFireDatabase.object("/users/shopping-cart/"+ key).set(order)
  }

  emptyShoppingCart(key: string) {
    return this.angularFireDatabase.object("/users/shopping-cart/"+ key).remove()
  }

  getOrdersFromTheShoppingCart(key: string) {
    return this.angularFireDatabase.list("/users/shopping-cart/"+ key).valueChanges()
  }

  placeOrderForTheUser(order: Order[], userId: string, currentTimeStamp: number) {
    //return this.angularFireDatabase.object("/users/order-lists/" + userId + "/" + currentTimeStamp).set(order)

    const orderRequest: OrderRequest = new OrderRequest()
    orderRequest.userId = userId
    orderRequest.orderPlacementTime = currentTimeStamp
    orderRequest.order = order
    orderRequest.deliveryStatus = 0

    return this.angularFireDatabase.object("/users/order-history/" + userId + currentTimeStamp).set(orderRequest)

  }

  getOrderHistory(userId: string) {
    //return this.angularFireDatabase.list('users/order-lists/' + userId).snapshotChanges()
    return this.angularFireDatabase.list('users/order-history/', ref => ref.orderByChild("userId").equalTo(userId)).snapshotChanges()
  }


  getSumOfGrocery(order: Order) {

    let sumOfIndividualOrder = 0

    if (order.bulkPurchaseOfferAvailable) {

      if(order.noOfItems >= order.bulkPurchaseOfferCount) {
        let totalSet = order.noOfItems / order.bulkPurchaseOfferCount
        sumOfIndividualOrder += Math.trunc(totalSet) * order.bulkPurchaseOfferPrice
      }

      let extraItems = order.noOfItems % order.bulkPurchaseOfferCount

      sumOfIndividualOrder += extraItems * order.actualPrice

    } else if (order.maxShoppingIsRestricted) {

      if (order.noOfItems <= order.maxShoppingCount) {
        sumOfIndividualOrder += order.noOfItems * order.offerPrice
      } else {
        let a = order.noOfItems - order.maxShoppingCount
        sumOfIndividualOrder += (a * order.actualPrice) + (order.maxShoppingCount * order.offerPrice)
      }

    } else {
      if(order.offerPrice == 0) {
        sumOfIndividualOrder += order.noOfItems * order.actualPrice
      } else {
        sumOfIndividualOrder += order.noOfItems * order.offerPrice
      }
    }
    return sumOfIndividualOrder
  }

  getTotalCostOfOrderedItems(orders: Order[]) {

    let sumOfItems = 0

    orders.forEach((order) => {

      sumOfItems += this.getSumOfGrocery(order)

      /*if (element.bulkPurchaseOfferAvailable) {

        if(element.noOfItems >= element.bulkPurchaseOfferCount) {
          let totalSet = element.noOfItems / element.bulkPurchaseOfferCount
          sumOfItems += Math.floor(totalSet) * element.bulkPurchaseOfferPrice
        }

        let extraItems = element.noOfItems % element.bulkPurchaseOfferCount

        sumOfItems += extraItems * element.actualPrice

      } else if (element.maxShoppingIsRestricted) {

        if (element.noOfItems <= element.maxShoppingCount) {
          sumOfItems += element.noOfItems * element.offerPrice
        } else {
          let a = element.noOfItems - element.maxShoppingCount
          sumOfItems += (a * element.actualPrice) + (element.maxShoppingCount * element.offerPrice)
        }

      } else {
        if(element.offerPrice == 0) {
          sumOfItems += element.noOfItems * element.actualPrice
        } else {
          sumOfItems += element.noOfItems * element.offerPrice
        }
      }*/
    });

    return sumOfItems
  }

  addDeliveryDateAndStatus(orderDeliveryStatus: OrderDeliveryStatus, userId: string, currentTimeStamp: number) {
    return this.angularFireDatabase.object("/users/delivery-status/" + userId + "/" + currentTimeStamp).set(orderDeliveryStatus)
  }

  getDeliveryDateAndStatus(userId: string, timestampKey: string) {
    return this.angularFireDatabase.list("/users/delivery-status/" + userId + "/" + timestampKey).valueChanges()
  }

  updateUserComments(userId: string, timestampKey: string, commentFromUser: string) {
    return this.angularFireDatabase.object("/users/delivery-status/" + userId + "/"  + timestampKey)
        .update({ commentsFromCustomer: commentFromUser })
  }

}
