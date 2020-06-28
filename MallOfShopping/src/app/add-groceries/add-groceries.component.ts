import {Component} from "@angular/core";
import {AddGroceryModel, DBMenu} from "./AddGroceryModel";
import {AngularFireDatabase} from "@angular/fire/database";
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-add-grocery-crumb',
  templateUrl: './add-groceries.component.html',
  styleUrls: ['./add-groceries.component.css']
})
export class AddGroceriesComponent   {

  // @ts-ignore
  addGroceryModel : AddGroceryModel = new AddGroceryModel()

  dbPath: string = ""

  menuItems: DBMenu[] = []

  selectedPath: DBMenu



  constructor(private  readonly firestore: AngularFireDatabase) {
    this.menuItems = [
      {name: 'admin/Fish', code: 'Baby Products/Body Care'},
      {name: 'admin/Campaign', code: 'Baby Products/Body Care'},
      {name: 'Baby Products/Body Care', code: 'Baby Products/Body Care'},
      {name: 'Baby Products/Foods', code: 'Baby Products/Body Care'},
      {name: 'Beverages/Beverages',code: 'Pulses & Lentils'},
      {name: 'Dal, Pulses & Lentils/Pulses & Lentils',code: 'Pulses & Lentils'},
      {name: 'Dal, Pulses & Lentils/Beans',code: 'Pulses & Lentils'},
      {name: 'Dal, Pulses & Lentils/Dal',code: 'Dal'},
      {name: 'Flour/Corn',code: 'Rome'},
      {name: 'Flour/Gram & Besan',code: 'Rome'},
      {name: 'Flour/Ragi',code: 'Rome'},
      {name: 'Flour/Rice',code: 'Rome'},
      {name: 'Flour/Sooji',code: 'Rome'},
      {name: 'Flour/Wheat',code: 'Rome'},
      {name: 'Flour/Barley',code: 'Baby Products/Foods'},
      {name: 'Flour/Singoda',code: 'Baby Products/Foods'},
      {name: 'Frozen/Veg-Items',code: 'Rome'},
      {name: 'General Groceries/Cooking & Baking',code: 'Rome'},
      {name: 'General Groceries/Oil',code: 'Rome'},
      {name: 'General Groceries/Pappad & Fries',code: 'Rome'},
      {name: 'General Groceries/Puffed & Flattened Rice',code: 'Rome'},
      {name: 'General Groceries/Coconut',code: 'Rome'},
      {name: 'General Groceries/Cooking & Baking', code: 'Baby Products/Body Care'},
      {name: 'General Groceries/Jaggery', code: 'Baby Products/Body Care'},
      {name: 'General Groceries/Pappad & Fries',code: 'Baby Products/Foods'},
      {name: 'General Groceries/Ghee & Diary',code: 'Baby Products/Foods'},
      {name: 'Health & Beauty/Hair Care', code: 'Baby Products/Body Care'},
      {name: 'Health & Beauty/Cream & Ointment', code: 'Baby Products/Body Care'},
      {name: 'Health & Beauty/Edible', code: 'Baby Products/Body Care'},
      {name: 'Health & Beauty/Hair Colour', code: 'Baby Products/Body Care'},
      {name: 'Health & Beauty/Body Care', code: 'Baby Products/Body Care'},
      {name: 'Health & Beauty/Sanitizer', code: 'Baby Products/Body Care'},
      {name: 'Health & Beauty/Shower', code: 'Baby Products/Body Care'},
      {name: 'Instant/Foods', code: 'Baby Products/Body Care'},
      {name: 'Instant/Drinks', code: 'Baby Products/Body Care'},
      {name: 'Masala & Spices/Masala',code: 'Rome'},
      {name: 'Masala & Spices/Whole Spices',code: 'Rome'},
      {name: 'Snacks/Snacks', code: 'Baby Products/Body Care'},
      {name: 'Paste & Pickle/Paste & Pickle', code: 'Baby Products/Body Care'},
      {name: 'Nuts & Dried Fruits/Nuts & Dried Fruits',code: 'Baby Products/Foods'},
      {name: 'Snacks/Snacks',code: 'Baby Products/Foods'},
    ];
  }

  save() {

    //this.addGroceryModel.dbPath = this.selectedPath.name

    const  list = this.firestore.list('admin/Catagories/' + this.selectedPath.name)
    console.log('admin/Catagories/' + this.selectedPath.name)
    list.push( this.addGroceryModel )
    console.log(this.addGroceryModel)

    /**const  list = this.firestore.list('stock_count/')

    list.set('1212', 78).then(r => console.log(r));
    list.set('12000', 78).then(r => console.log(r));
    list.set('11000', 78).then(r => console.log(r));*/
  }
}
