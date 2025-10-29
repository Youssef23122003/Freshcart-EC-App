import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {

mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    items:1,
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 1
    //   },
    //   740: {
    //     items: 1
    //   },
    //   940: {
    //     items: 1
    //   }
    // },
    nav: false
  }
}
