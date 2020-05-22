import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/database";
import {User} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  constructor(private readonly angularFireDatabase: AngularFireDatabase) {
  }

  getUserDetails(userId: string) {
    return this.angularFireDatabase.list('users/user-details/' + userId).snapshotChanges()
  }
}
