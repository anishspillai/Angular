import {Injectable} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import {Order} from "../individual-grocery/model/Order";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";
import {Observable} from "rxjs";

@Injectable()
export class GroceryService {

  constructor(private readonly angularFireDatabase: AngularFireDatabase) {
  }

  placeOrderForTheUser(order: Order[], userId: string, currentTimeStamp: number) {
    //return this.angularFireDatabase.object("/users/order-lists/" + userId + "/" + currentTimeStamp).set(order)

    const userData: UserData = new UserData()
    userData.userId = userId
    userData.currentTimestamp = currentTimeStamp
    userData.order = order

    return this.angularFireDatabase.object("/users/test/" + userId + currentTimeStamp).set(userData)

  }

  getOrderHistory(userId: string) {
    //return this.angularFireDatabase.list('users/order-lists/').snapshotChanges()

    //return this.angularFireDatabase.list('users/order-lists/', ref => ref.limitToLast(10)).snapshotChanges()


    //return this.angularFireDatabase.list('users/order-history/', ref => ref.orderByChild("currentTimestamp").limitToLast(10)).snapshotChanges()

    //return this.angularFireDatabase.list('users/order-history/', ref => ref.orderByChild("userId").equalTo("aeErXZLzJwgtjfkBfnPjpGVVXes2")).snapshotChanges()

    return this.angularFireDatabase.list('users/order-history/', ref => ref.orderByChild("orderPlacementTime").startAt(1396666643441).endAt(2096666643441)).snapshotChanges()
  }

  getOrderHistoryFilteredByDate(startTime: number, endTime: number) {
    return this.angularFireDatabase.list('users/order-history/', ref => ref.orderByChild("orderPlacementTime").startAt(startTime).endAt(endTime)).snapshotChanges()
  }

  getOrderHistoriesForAdmin() {
    return this.angularFireDatabase.list('users/order-lists/').snapshotChanges()
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
    console.log(userId + ' ' + timestampKey)
    return this.angularFireDatabase.list("/users/delivery-status/" + userId + "/" + timestampKey).valueChanges()
  }

  updateUserComments(userId: string, timestampKey: string, commentFromUser: string) {
    return this.angularFireDatabase.object("/users/delivery-status/" + userId + "/"  + timestampKey)
        .update({ commentsFromCustomer: commentFromUser })
  }


  addOrderHistory(userId: string, ordered: OrderDeliveryStatus, orderKey: string) {


    return this.angularFireDatabase.object("/users/delivery-status/" + userId + "/" + orderKey).set(ordered)
  }

  updateAdminComment(_userId: string, orderKey: string, commentsFromMallOfGroceries: string, deliveryDate: Date, deliveryStatus: string) {

    console.log(deliveryStatus)


    return this.angularFireDatabase.object("/users/delivery-status/" + _userId + "/"  + orderKey)
      .update({ commentsFromMallOfGroceries: commentsFromMallOfGroceries,
        actualDeliveryDate: deliveryDate?.getTime(), deliveryStatus: deliveryStatus})

  }
}

export class UserData {
  userId: string
  currentTimestamp: number
  order: Order[]
}
