import {Component} from "@angular/core";
import {AddGroceryModel} from "./AddGroceryModel";
import {AngularFireDatabase} from "@angular/fire/database";


@Component({
  selector: 'app-add-grocery-crumb',
  templateUrl: './add-groceries.component.html',
  styleUrls: ['./add-groceries.component.css']
})
export class AddGroceriesComponent   {

  // @ts-ignore
  addGroceryModel : AddGroceryModel = new AddGroceryModel()

  dbPath: string = ""



  constructor(private  readonly firestore: AngularFireDatabase) {
  }

  save() {
    if(this.dbPath.length == 0) {
      alert(this.dbPath.length + ' ' + this.dbPath)
    }
    const  list = this.firestore.list('admin/Catagories/' + this.dbPath)
    list.push( this.addGroceryModel )
    console.log(this.addGroceryModel)
  }
}
