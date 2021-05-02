export class IndividualGrocery {

  actualPrice: number = 10;
  brandName: string = "Anish";
  id: string = "Ansih";
  imagePath: string = "Anish";
  offerPrice: number  = 5;
  type: string = "Wheat";
  subType: string = "sub type"
  unitOfWeight: string = "Kg";
  weight: number = 7.5;

  maxShoppingIsRestricted = false
  maxShoppingCount: number = 2

  bulkPurchaseOfferAvailable = false
  bulkPurchaseOfferCount: number = 2
  bulkPurchaseOfferPrice: number = 78.45
  description: string
  swedishDescription: string
  allergyInformation: string
  nutrients: string;
  header: string;
  subCatagory: string;
  catagory:string
}

export class GroceryResponse {
  public groceryType: string
  public groceryList: IndividualGrocery[]
}
