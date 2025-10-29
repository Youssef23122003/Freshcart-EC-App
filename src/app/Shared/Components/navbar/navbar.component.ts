
import { Component, computed, inject, Input, PLATFORM_ID, Signal } from '@angular/core';
import { FlowbiteService } from '../../../Core/Services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Core/Auth/Services/auth.service';

import { Token } from '../../../Core/Interfaces/token.interface';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../Core/Services/Wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
 constructor(private flowbiteService: FlowbiteService) {}

 private readonly authService = inject(AuthService)
 private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService)
 private readonly id= inject(PLATFORM_ID)

  @Input({required:true}) isLogin!:boolean

  token:Token = {} as Token
  count:Signal<number>=computed(()=>this.cartService.cartCount())
  favCount:Signal<number>=computed(()=>this.wishlistService.favCount())

  LogOut():void{
    this.authService.logout()

  }




  getCartData():void{

  this.cartService.getUserCart().subscribe(
    {next:(res)=>{
      console.log(res);
     this.cartService.cartCount.set(res.numOfCartItems)

    },error:(err)=>{
      console.log(err);

    }}
 )
}

 getFavsData():void{
    this.wishlistService.getFromWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistService.favCount.set(res.count)
      }
    })
  }


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    }
  )

    if(isPlatformBrowser(this.id)){
      if(this.isLogin===true){
        this.getCartData()
        this.getFavsData()
      }

    }




  this.token =  this.authService.decodeToken()
  }
}
