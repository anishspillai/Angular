import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCarouselComponent {

  /**DAL_LENTILS_PULSES: any[]

  FLOURS: any[]

  GENERAL_GROCERIES: any[]

  MASALA: any[]

  NEW_PRODUCTS: any[]

  responsiveOptions; */

  constructor(
    private readonly router: Router) {
    /**this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];*/
  }

  navigateToHomePage(mainPage: string, subPage: string) {
    const queryParams = {'groceryType': subPage , 'subMenu': 'true', 'main': mainPage}
    this.router.navigate([queryParams])
  }


  ngOnInit() {

    /**

    this.DAL_LENTILS_PULSES = [
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Alubia.png', 'type': 'Alubia Beans'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Redkidney.jpg', 'type': 'Red Kidney Beans'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_blackeyebeans.png', 'type': 'Black Eye Beans'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Rosecoco.png', 'type': 'Rosecoco Beans'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Channa_Dal.png', 'type': 'Chana Dal'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Mung_Dal.png', 'type': 'Mung Dal'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Toor_Dal_Plain.png', 'type': 'Toor Dal Plain'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Moong_Dal_Chilka.png', 'type': 'Mung Dal Chilka'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Urid_Whole_Gota.jpg', 'type': 'Urid Gota Whole'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/Heera_Kala_Channa.png', 'type': 'Black Chana'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Brown_Chick_Peas.png', 'type': 'Brown Chick Peas'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Brown_Lentils.png', 'type': 'Brown Lentils'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_SoyaChunk.png', 'type': 'Soya Chunk'}
    ]

    this.FLOURS = [
      {'brandName': 'Pillsbury', 'imagePath': 'assets/img/flours/wheat/Pillsbury.png', 'type': 'Wheat Flour'},
      {'brandName': 'Ashirvad', 'imagePath': 'assets/img/flours/wheat/Aashirvaad_Wheat.png', 'type': 'Wheat Flour'},
      {'brandName': 'Heera', 'imagePath': 'assets/img/flours/wheat/heera_atta.png', 'type': 'Wheat Flour'},
      {'brandName': 'Silver Coin', 'imagePath': 'assets/img/flours/wheat/silver_coin_atta.png', 'type': 'Wheat Flour'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/flours/TRS_Sooji.png', 'type': 'Coarse Sooji'},
      {'brandName': 'Natco', 'imagePath': 'assets/img/flours/Rice/Natco.png', 'type': 'Rice Flour'},
      {'brandName': 'Heera', 'imagePath': 'assets/img/flours/Ragi/TRS.png', 'type': 'Ragi Flour'},
      {'brandName': 'Heera', 'imagePath': 'assets/img/flours/Barley/Heera.png', 'type': 'Barley Flour'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/flours/gram/TRS_Gram.png', 'type': 'Gram Flour'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/flours/TRS_Corn_Meal.png', 'type': 'Corn Meal'}
    ]

    this.GENERAL_GROCERIES = [
      {'brandName': 'Natco', 'imagePath': 'assets/img/General/Coconut/Natco_Desiccated.png', 'type': 'Desiccated Coconut'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/General/Coconut/TRS_Dried_Coconut.png', 'type': 'Dried Coconut Halves'},
      {'brandName': 'KTC', 'imagePath': 'assets/img/General/Baking/KTC_Slice.jpg', 'type': 'Mango Slice'},
      {'brandName': 'KTC', 'imagePath': 'assets/img/General/Baking/TRS_Kesar_Mango_Pulp.png', 'type': 'Mango Pulp'},
      {'brandName': 'Annam', 'imagePath': 'assets/img/General/Baking/Annam_Tamarind_400g.jpg', 'type': 'Tamarind'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/General/Baking/TRS_CitricAcid.png', 'type': 'Citric Acid'},
      {'brandName': 'Vandevi', 'imagePath': 'assets/img/General/Baking/VandeviHing50g-1.jpg', 'type': 'Asafoetida'},
      {'brandName': 'Patanjali', 'imagePath': 'assets/img/General/Ghee/Patanjali.png', 'type': 'Ghee'},
      {'brandName': 'Khanum', 'imagePath': 'assets/img/General/Ghee/Khanum.png', 'type': 'Ghee'},
      {'brandName': 'Heera', 'imagePath': 'assets/img/General/Jaggery/Heera_Jaggery.jpg', 'type': 'Jaggery'},
      {'brandName': 'KTC', 'imagePath': 'assets/img/General/Oil/KTC_Coconut.png', 'type': 'Coconut Oil'},
      {'brandName': 'KTC', 'imagePath': 'assets/img/General/Oil/KTC_Veg_Oil.png', 'type': 'Vegetable Oil'},
      {'brandName': 'KTC', 'imagePath': 'assets/img/General/Oil/KTC_Sunflower_Oil.png', 'type': 'Sunflower Oil'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/General/Pappad/TRS_Pappad.png', 'type': 'Pappadoms'},
      {'brandName': 'Heera', 'imagePath': 'assets/img/General/Rice/Heera_Rice_Flakes_mediuim.png', 'type': 'Poha/ Powa'},
      {'brandName': 'Annam', 'imagePath': 'assets/img/Instant/ANNAM_Mumra_200g.jpg', 'type': 'Mumra'}
    ]

    this.MASALA = [
      {'brandName': 'MDH', 'imagePath': 'assets/img/Spices/MDH_Chana_Dal_Masala.png', 'type': 'Chana Dal Masala'},
      {'brandName': 'MDH', 'imagePath': 'assets/img/Spices/MDH_Chana_Masala.png', 'type': 'Chana Masala'},
      {'brandName': 'MDH', 'imagePath': 'assets/img/Spices/MDH_Chicken_Curry_Masala.png', 'type': 'Chicken Curry'},
      {'brandName': 'MDH', 'imagePath': 'assets/img/Spices/MDH_Dal_Makhani_Masala.png', 'type': 'Dal Makhani'},
      {'brandName': 'MDH', 'imagePath': 'assets/img/Spices/MDH_Kitchen_King.png', 'type': 'Kitchen King'},
      {'brandName': 'MDH', 'imagePath': 'assets/img/Spices/MDH_Jal_Jeera_Masala.png', 'type': 'Jal Jeera Masala'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/Spices/TRS_Mild_Madras_Curry_Powder.png', 'type': 'Madras Curry Powder'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/Spices/TRS_Paprica_Masala.png', 'type': 'Paprika Powder'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/Spices/TRS/KasuriMethi.png', 'type': 'Kasuri Methi'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/Spices/TRS_Ajwain_seeds.png', 'type': 'Ajwain Seeds'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/Spices/TRS_Black_Pepper_Whole.png', 'type': 'Black pepper whole'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/Spices/TRS_Green_Cardamom.png', 'type': 'Green Cardamon'}
    ]

    this.NEW_PRODUCTS = [
      {'brandName': 'Annam', 'imagePath': 'assets/img/flours/Rice/Annam.jpg', 'type': 'Rice Flour'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/TRS_Green_Lentils.jpg', 'type': 'Green Lentils'},
      {'brandName': 'MTR', 'imagePath': 'assets/img/Pickle_Paste/MTR_Sliced_Mango.jpg', 'type': 'Cut Mango Pickle'},
      {'brandName': 'Annam', 'imagePath': 'assets/img/Pickle_Paste/Annam_GG.jpg', 'type': 'Ginger Garlic Paste'},
      {'brandName': 'Heera', 'imagePath': 'assets/img/Col_Flav/Heera_Rose_Essense.jpg', 'type': 'Rose Water'},
      {'brandName': 'KTC', 'imagePath': 'assets/img/General/Ghee/KTC.jpg', 'type': 'Ghee'},
      {'brandName': 'TRS', 'imagePath': 'assets/img/dals/Yellow-Split-Peas.jpg', 'type': 'Yellow Split Lentils'},
      {'brandName': 'Annam', 'imagePath': 'assets/img/flours/Rice/Annam_Puttu.jpg', 'type': 'Puttu Flour'}

    ]
     */
  }
}
