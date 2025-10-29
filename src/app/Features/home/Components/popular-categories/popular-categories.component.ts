import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../Core/Services/Categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],

  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {
  loading:boolean = true
  categoriesList:Category[]= []
  private readonly categoriesService = inject(CategoriesService)


categoriesOptions: OwlOptions = {
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
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }




  getAllCategoriesData():void{
    this.loading = true
    this.categoriesService.getAllCategories().subscribe(
      {
        next:(res)=>{
          console.log(res.data);
          this.categoriesList=res.data
          this.loading = false
        },
        error:(err)=>{
          console.log(err);
          this.loading = false
        }
      }
    )
  }

  ngOnInit(): void {
this.getAllCategoriesData()
  }
}
