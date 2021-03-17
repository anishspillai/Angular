import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../individual-grocery/model/Order";
import {GroceryService} from "../grocery-grid/grocery.service";
import {OrderHistoryModel} from "../order-history/OrderHistory.model";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {UserDetailsService} from "../user-details/user.details.service";
import {BillingService} from "./billing.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(private readonly groceryService: GroceryService,
              private readonly  userDetailsService: UserDetailsService, private readonly billingService: BillingService) { }

  @Input() orderHistory: Order[] = []
  @Input() userId: string
  @Input()  cols: any[]
  @Input() orderedTimeStamp: string
  userDetailsModel: UserDetailsModel = new UserDetailsModel()

  ngOnInit(): void {

  }


  generatePdf() {


    this.userDetailsService.getUserDetails(this.userId).subscribe(value => {

      if (value && value.length != 0) {
        this.userDetailsModel.postNumber = value[4] as string
        this.userDetailsModel.streetName = value[5] as string
        this.userDetailsModel.apartmentNo = value[1] as string
        this.userDetailsModel.telephoneNumber = value[6] as string
        this.userDetailsModel.firstName = value[2] as string
        this.userDetailsModel.lastName = value[3] as string
        this.userDetailsModel.address = value[0] as string
      }
      this.printPdfContents()
    }, (error) => {
      alert(JSON.stringify('Billing page not loading....' + error))
    })
  }


  getIndividualCostOfItem(order: Order) {

    if(order) {
      if(order.isNew) {
        return order.noOfItems * order.actualPrice
      } else {
        return this.groceryService.getSumOfGrocery(order)
      }
    }

    return 0
  }

  getTotalCostOfTheOrder() {
    return this.groceryService.getTotalCostOfOrderedItems(this.orderHistory)
  }

  getTotalCost() {
    return this.groceryService.getTotalCostOfOrderedItems(this.orderHistory) + ' Kr'
  }

  getMomsPercentageValue() {
    return (this.groceryService.getTotalCostOfOrderedItems(this.orderHistory) * 0.12).toFixed(2) + ' Kr'
  }

  addNewRow() {
    // @ts-ignore
    let order = new Order();
    order.isNew = true
    this.orderHistory.push(order)
  }

  printPdfContents() {
    let docDefinition = {
      content: [
        {
          text: 'Mall of Groceries / Urban Fresh Grocers',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'MOMS Reg No: SE880716092701',
          fontSize: 10,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Org No: 8807160927',
          fontSize: 10,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Månstorpsvägen 22, Tullinge, Stockholm, 14645',
          fontSize: 9,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 18,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue',
          margin: [0, 10, 0, 5]
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.userDetailsModel.firstName,
                bold: true,
              },
              {text: this.userDetailsModel.streetName},
              {text: this.userDetailsModel.postNumber},
              {text: this.userDetailsModel.telephoneNumber}
            ],
            [
              {
                text: `Date: ${this.orderedTimeStamp}`,
                alignment: 'right'
              }
              /**,
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }*/
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [{text: 'Product', style: 'tableHeader', alignment: 'center'}, {text: 'Weight', style: 'tableHeader', alignment: 'center'}, {text: 'Price', style: 'tableHeader', alignment: 'center'}, {text: 'Quantity', style: 'tableHeader', alignment: 'center'}, {text: 'Amount', style: 'tableHeader', alignment: 'center'}],
              ...this.orderHistory.map(p => ([
                {text: p.groceryName + ' ' + p.type, italics: true, color: 'black', fontSize: 10},
                {text: p.grossWeight + ' ' + p.unitOfWeight, italics: true, color: 'black', fontSize: 10},
                {text: p.actualPrice, italics: true, color: 'black', fontSize: 10},
                {text: p.noOfItems, italics: true, color: 'black', fontSize: 10},
                {text:(p.actualPrice * p.noOfItems).toFixed(2), italics: true, color: 'black', fontSize: 10}
              ])),
              [{text: 'Total Amount', colSpan: 4, bold: true, italics: true}, {}, {}, {}, this.getTotalCost()],
              [{text: 'MOMS 12 % ( Inclusive )', colSpan: 4, italics: true, fontSize: 12}, {}, {}, {}, this.getMomsPercentageValue()]
            ]

          },
          layout: {
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'green' : 'purple';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'green' : 'purple';
            },
          }
        },
        {
          text: 'Please pay by Swish',
          style: 'box'
        },
        {
          table: {
            widths: [300, 200],
            body: [

              [
                {text: 'Mobile Number', border: [true, true, false, false]},
                {text: '0761543749', border: [false, true, true, false]}
              ],
              [
                {text: 'Name', border: [true, false, false, true]},
                {text: 'Suresh Swathy', border: [false, false, true, true]}
              ]
            ]
          }
        }


      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        box: {
          italic: true,
          fontSize: 10,
          color: 'black',
          margin: [5, 5, 5, 15]
        }
      }
    }

    pdfMake.createPdf(docDefinition).open();
    //const pdfDocGenerator = pdfMake.createPdf(docDefinition)


      //this.billingService.sendEmail("Anish", "", pdfDocGenerator).subscribe(value => console.log(value))


  }

  sendPdfAsAttachment() {
      this.billingService.sendEmail("Anish", "", "").subscribe(value => console.log(value))
  }
}
