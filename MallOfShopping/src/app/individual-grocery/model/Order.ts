import {IndividualGrocery} from "./IndividualGrocery";

export class Order {
  constructor(
    public actualPrice: number = 12,
    public groceryName: string = "Anish",
    public id: string = "Ansih",
    public imagePath: string = "Anish",
    public timeOfOrder: string = "",
    public type: string = "Wheat",
    public unitOfWeight: string = "Kg",
    public grossWeight: number = 7.5,
    public noOfItems: number,
    public maxShoppingIsRestricted = false,
    public maxShoppingCount: number = 7,
    public bulkPurchaseOfferAvailable = false,
    public bulkPurchaseOfferCount: number = 2,
    public bulkPurchaseOfferPrice: number = 78.45,
    public offerPrice: number = 12,
    public subType: string = "",
    public priceChangeTracker: PriceChangeTracker = null,
    public countChangeTracker: CountChangeTracker = null,
  ) {
  }

  static createThisObjectFromIndividualGrocerObject(individualGrocery: IndividualGrocery) {

    return new Order(individualGrocery.actualPrice,
      individualGrocery.brandName,
      individualGrocery.id,
      individualGrocery.imagePath,
      "",
      individualGrocery.type,
      individualGrocery.unitOfWeight,
      individualGrocery.weight,
      1,
      individualGrocery.maxShoppingIsRestricted,
      individualGrocery.maxShoppingCount,
      individualGrocery.bulkPurchaseOfferAvailable,
      individualGrocery.bulkPurchaseOfferCount,
      individualGrocery.bulkPurchaseOfferPrice,
      individualGrocery.offerPrice,
      individualGrocery.subType
    )
  }
}

export class PriceChangeTracker {
  constructor(
    public oldCost= 0, // Old Cost of the item. What if user uses the order history items in the cart.
    public newCost = 0, // This one is added if the stock price changed after user keeps item in cart ( Remember solna case, He keeps rice with price 80 always )
  ) {
  }
}

export class CountChangeTracker {
  constructor(
    public oldCount = 0, //This one is added if the stock count changed after user keeps item in cart ( some one else placed order for same item and updated count )
    public newCount = 0, // What is the latest stock count in the database for the item.
  ) {
  }
}
