import {Injectable} from '@angular/core';
import {GroceryCountModel} from "./individual-grocery/model/GroceryCountModel";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";
import {ProductDescription} from "./individual-grocery/model/ProductDescription";

@Injectable({
  providedIn: 'root'
})
export class GroceryCountService {

  groceryCountModels: GroceryCountModel[]

  items: Observable<any[]>;


  constructor(private readonly angularFireDatabase: AngularFireDatabase) { }

  fetchGroceryCount() {

    this.groceryCountModels = []

    this.angularFireDatabase.list<GroceryCountModel>('stock_count').snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const groceryCountModel: GroceryCountModel = new GroceryCountModel(action.key, action.payload.val() as unknown as number)

        /**  https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md  */

        this.groceryCountModels.push(groceryCountModel)
      });
    });
  }

  public isStockAvailable(idOfTheItem: string): boolean {

    const groceryModel = this.groceryCountModels.find(value => value.id == idOfTheItem)

    if(groceryModel) {
      return groceryModel.count > 0
    }

    return true
  }

  public getGroceryCountModel(idOfTheItem: string): GroceryCountModel {
    return this.groceryCountModels.find(value => value.id == idOfTheItem)
  }

  updateCountOfGrocery(id, number: number) {
    const  list = this.angularFireDatabase.list('stock_count/')
    list.set(id, number).catch(reason => console.log(reason));
  }

  setPriceForTheGrocerItem(id, price) {
    const  list = this.angularFireDatabase.database.ref('admin/Products/'+id).update({
      actualPrice: price
    })
  }

  setDescription(id, description): Promise<any> {
    return this.angularFireDatabase.database.ref('admin/Products/'+id).update({
      description: description
    })
  }

  setNewWeight(id: string, newWeight: any) {
    const  list = this.angularFireDatabase.database.ref('admin/Products/'+id).update({
      weight: newWeight
    })
  }

  setUnitOfWeight(id: string, unitOfWeight: string) {
    const  list = this.angularFireDatabase.database.ref('admin/Products/'+id).update({
    unitOfWeight: unitOfWeight
    })
  }

  deleteMe(id) {
    const  list = this.angularFireDatabase.database.ref('admin/Products/'+id).remove()
  }

  setSubCatagory(id: string, subCatagory: any) {
    const  list = this.angularFireDatabase.database.ref('admin/Products/'+id).update({
      subCatagory: subCatagory
    })
  }

  setSwedishDescription(id, description) {
    const list = this.angularFireDatabase.database.ref('admin/Product_Description/'+id).set({
      swedishDescription: description
    })
  }

  setAllergyInformation(id, allergy): Promise<any> {
    return this.angularFireDatabase.database.ref('admin/Product_Description/'+id).update({
      allergyInformation: allergy
    })
  }

  setNutrients(id: string, nutrients: string) {
    const list = this.angularFireDatabase.database.ref('admin/Product_Description/'+id).update({
      nutrients: nutrients
    })

  }

  addProductDescriptionIntoDataBase(productDescription: ProductDescription) {
    return this.angularFireDatabase.database.ref('admin/Product_Description').push(productDescription);
  }

  getProductDescription(productId: string) {
    console.log(productId)
    return this.angularFireDatabase.list('admin/Product_Description', ref => ref.orderByChild("id").equalTo(productId)).snapshotChanges()
  }



  setHeader(id: string, header: string) {
    const list = this.angularFireDatabase.database.ref('admin/Product_Description/'+id).update({
      header: header
    })}

setActualWebsiteLink(id: string, actualWebsiteLink: string) {
  const list = this.angularFireDatabase.database.ref('admin/Product_Description/'+id).update({
    actualWebsiteLink: actualWebsiteLink
  })}
}
