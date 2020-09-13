import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";

@Injectable()
export class NavigatorService {


  constructor(private firestore: AngularFireDatabase) {
  }

  fetchCategories(): any {
   return this.firestore.list('admin/SearchCatagory').snapshotChanges()
  //  return null
  }

}
