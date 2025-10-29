import { Component, computed, signal, WritableSignal} from '@angular/core';

import { PopularProductsComponent } from "./Components/popular-products/popular-products.component";
import { MainSliderComponent } from "./Components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./Components/popular-categories/popular-categories.component";

@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent, MainSliderComponent, PopularCategoriesComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  price:WritableSignal<number> = signal(20)
  quantitiy:WritableSignal<number> = signal(100)
totalPrice = computed(()=>this.price()*this.quantitiy())


  updatePrice():void{
    this.price.update((value)=>value+10)
  }

}
