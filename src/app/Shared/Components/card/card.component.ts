import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../../Core/Pipes/term-pipe';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../Core/Services/Wishlist/wishlist.service';


@Component({
  selector: 'app-card',
  imports: [RouterLink,CurrencyPipe,TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent  {
@Input({required:true}) product = {} as Product
private readonly toastr = inject(ToastrService)
private readonly cartService = inject(CartService)
private readonly wishlistService = inject(WishlistService)

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



addTofav(prodId:string):void{
  this.wishlistService.addToWishlist(prodId).subscribe({
    next:(res)=>{
      console.log(res);
      this.toastr.success(res.message)
      this.wishlistService.favCount.set(res.data.length)
    }

  }

)
}

}
