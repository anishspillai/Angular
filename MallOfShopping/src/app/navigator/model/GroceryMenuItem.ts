export class GroceryMenuItem {
  label?: string;
  url?: string;
  icon?: string;
  command?: (event?: any) => void;
  items?: GroceryMenuItem[];
  separator?: boolean;
  routerLink?: string = ""
  queryParams?: {
    [k: string]: any;
  };


  constructor(label:string) {
    this.label = label
  }

}
