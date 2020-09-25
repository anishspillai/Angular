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
    if (this.groceryCountModels) {
      return this.groceryCountModels.find(value => value.id == idOfTheItem)
    }
  }

}
