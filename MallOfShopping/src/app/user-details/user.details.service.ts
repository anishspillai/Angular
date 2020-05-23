import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/database";
import {User} from "firebase";
import {UserDetailsModel} from "./model/user.details.model";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  constructor(private readonly angularFireDatabase: AngularFireDatabase) {
  }

  getUserDetails(userId: string) {
    return this.angularFireDatabase.list('users/user-details/' + userId).valueChanges()
  }

  saveUserDetails(userDetailsModel: UserDetailsModel, userId: string) {
    return this.angularFireDatabase.object("/users/user-details/" + userId ).set(userDetailsModel)
  }

}
