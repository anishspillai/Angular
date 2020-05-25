export class GroceryMenuItem {
  label?: string;
  url?: string;

  constructor(label:string) {
    this.label = label
  }

  items?: GroceryMenuItem[] = [];
}
