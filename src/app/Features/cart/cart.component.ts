import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
private readonly cartService = inject(CartService)
private readonly toastr = inject(ToastrService)
deletingItemId: string | null = null;


cartData:CartDetails = {} as CartDetails



getCartData():void{

  this.cartService.getUserCart().subscribe(
    {next:(res)=>{
      console.log(res);
      this.cartData = res.data

    },error:(err)=>{
      console.log(err);

    }}
  )
}

deleteCartItem(productId:string):void{
   this.deletingItemId = productId
  this.cartService.removeProductFromCart(productId).subscribe(
    {next:(res)=>{
      console.log(res);
    this.cartData = res.data
    this.cartService.cartCount.set(res.numOfCartItems)
    this.toastr.success('this item has been deleted from your cart successfully')
       this.deletingItemId = null
    },error:(err)=>{
      console.log(err);
       this.deletingItemId = null
    }}
  )
}

updateCartCount(productId:string,count:number):void{
  this.cartService.updateProductCart(productId,count).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartData = res.data
      this.toastr.success('count has been updated')
    },
    error:(err)=>{
      console.log(err);

    }
  })
}

ngOnInit(): void {
this.getCartData()
}

}
