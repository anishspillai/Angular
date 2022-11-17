import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  constructor(private readonly firestore: AngularFireDatabase) {
  }

  logErrorMessage(userId: string, error: Error) {
    const  list = this.firestore.list('admin/error_logs/' + userId + '_' + Date.now().toLocaleString())
    list.push( 'errorMessage: ' + error.stack + 'errorName: ' + error.name )
  }
}
