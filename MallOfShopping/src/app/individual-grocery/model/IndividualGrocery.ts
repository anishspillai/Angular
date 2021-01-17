export class IndividualGrocery {

  actualPrice?: number;
  brandName?: string
  id?: string
  imagePath?: string
  offerPrice?: number
  type?: string
  subType?: string
  unitOfWeight?: string
  weight?: number

  maxShoppingIsRestricted? = false
  maxShoppingCount?: number

  bulkPurchaseOfferAvailable? = false
  bulkPurchaseOfferCount?: number
  bulkPurchaseOfferPrice?: number

  objectID? : string

  description: string
}

export class GroceryResponse {
  public groceryType: string
  public groceryList: IndividualGrocery[]
}
