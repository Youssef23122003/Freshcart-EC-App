import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/Services/Cart/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  loading:boolean = false
  productData:Product={} as Product
  id:string | null = null
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService = inject(ProductDetailsService)
private readonly toastr = inject(ToastrService)
private readonly cartService = inject(CartService)


  addToCart(productId:string):void{

this.cartService.addProductToCart(productId).subscribe({
  next:(res)=>{
    console.log(res);
    this.cartService.cartCount.set(res.numOfCartItems)
    this.toastr.success(res.message)

  },
  error:(err)=>{
    console.log(err);


  }
})
}

  getProductData():void{
    this.loading = true
    this.productDetailsService.getSpeceificPoductDetails(this.id).subscribe(
      {next:(res)=>{
        console.log(res.data);
        this.productData = res.data
        this.loading=false
      },
      error:(err)=>{
        console.log(err);
        this.loading=false
      }
    }
    )
  }

  getProductId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.id =params.get('id')
        console.log(this.id);

      }
    })
  }

  productDetailsOptions: OwlOptions = {
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
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav:false
  }



  ngOnInit(): void {
    this.getProductId()
    this.getProductData()
  }

}
