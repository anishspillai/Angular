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

  catagory? : string

  description: string
}

export class GroceryResponse {
  public groceryType: string
  public groceryList: IndividualGrocery[]
}

export class GroceryCount {
  stockCount: number
  isFastMoving: boolean
  category: string
  id: string
}
