import {IndividualGrocery} from "./IndividualGrocery";

export class Order {
  constructor(
    public price: number = 12,
    public groceryName: string = "Anish",
    public id: string = "Ansih",
    public imagePath: string = "Anish",
    public timeOfOrder: string = "",
    public type: string = "Wheat",
    public unitOfWeight: string = "Kg",
    public grossWeight: number = 7.5,
    public noOfItems: number
  ) {
  }

  static createThisObjectFromIndividualGrocerObject(individualGrocery: IndividualGrocery) {

    return new Order(individualGrocery.offerPrice,
      individualGrocery.brandName,
      individualGrocery.id, "",      "",
      individualGrocery.type,
      individualGrocery.unitOfWeight,
      individualGrocery.weight,
      1)
  }
}
