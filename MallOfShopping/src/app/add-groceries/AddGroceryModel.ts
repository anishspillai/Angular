export class AddGroceryModel {
  constructor(
    public actualPrice : Number =  75,
    public brandName : String = "Brookebond",
    public bulkPurchaseOfferAvailable = false,
    public bulkPurchaseOfferCount = 0,
    public bulkPurchaseOfferPrice: Number = 0,
    public id : 3506,
    public imagePath = "assets/img/Beverages/Banadir_One_Caffe.png",
    public maxShoppingCount = 0,
    public maxShoppingIsRestricted = false,
    public offerPrice =  0,
    public subType =  "Breast Fillet",
    public type = "Taj Mahal",
    public unitOfWeight = "Grams",
    public weight = "900",
    public dbPath: string =""
  ) {
  }
}
