import {Component} from "@angular/core";
import {AddGroceryModel} from "./AddGroceryModel";
import {AngularFireDatabase} from "@angular/fire/database";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-add-grocery-crumb',
  templateUrl: './add-groceries.component.html',
  styleUrls: ['./add-groceries.component.css']
})
export class AddGroceriesComponent   {

  // @ts-ignore
  addGroceryModel : AddGroceryModel = new AddGroceryModel()



  constructor(private  readonly firestore: AngularFireDatabase) {
  }

  save() {

    console.log(this.addGroceryModel)
    const  list = this.firestore.list('admin/Catagories/' + this.addGroceryModel.dbPath)
    list.push( this.addGroceryModel )
  }
}
