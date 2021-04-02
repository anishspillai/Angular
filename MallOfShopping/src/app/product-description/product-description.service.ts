import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable()
export class ProductDescriptionService {


  constructor(private readonly angularFireDatabase: AngularFireDatabase) {
  }

  getProductDescription(productId: string) {
    //return this.angularFireDatabase.list('users/order-lists/' + userId).snapshotChanges()
    return this.angularFireDatabase.list('users/order-history/', ref => ref.orderByChild("id").equalTo(productId)).snapshotChanges()
  }
}
