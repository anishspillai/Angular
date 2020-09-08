import { Injectable } from '@angular/core';
import {GroceryCountModel} from "./individual-grocery/model/GroceryCountModel";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";

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

  setNewWeight(id: string, newWeight: any) {
    const  list = this.angularFireDatabase.database.ref('admin/Products/'+id).update({
      weight: newWeight
    })
  }

  deleteMe(id) {
    const  list = this.angularFireDatabase.database.ref('admin/Products/'+id).remove()
  }
}
