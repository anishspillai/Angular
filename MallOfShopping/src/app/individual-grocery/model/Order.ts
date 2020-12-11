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
    public noOfItems: number = 0,
    public maxShoppingIsRestricted = false,
    public maxShoppingCount: number = 7,
    public bulkPurchaseOfferAvailable = false,
    public bulkPurchaseOfferCount: number = 2,
    public bulkPurchaseOfferPrice: number = 78.45,
    public offerPrice: number = 12,
    public subType: string = ""

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
