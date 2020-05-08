export class IndividualGrocery {
  actualPrice: number = 12;
  brandName: string = "Anish";
  id: string = "Ansih";
  imagePath: string = "Anish";
  offerPrice: number  = 4;
  subType: string = "Anish sub";
  type: string = "Wheat";
  unitOfWeight: string = "Kg";
  weight: number = 7.5;
}

export class GroceryResponse {
  public groceryType: string
  public groceryList: IndividualGrocery[]
}
