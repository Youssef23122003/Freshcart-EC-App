import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../Core/Services/Wishlist/wishlist.service';
import { Favouriteitem } from './interfaces/favouriteitem.interface';
import { RouterLink } from "@angular/router";
import { CardComponent } from "../card/card.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

favList:Product[]=[]
  private readonly wishlistService = inject(WishlistService)
  private readonly toastr = inject(ToastrService)

  getFavsData():void{
    this.wishlistService.getFromWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.favList=res.data

      }
    })
  }

  deleteFav(prodId:string):void{
    this.wishlistService.removeFromWishlist(prodId).subscribe({
      next:(res)=>{
        console.log(res);
       this.toastr.success(res.message)
        this.getFavsData()
        this.wishlistService.favCount.set(res.data.length)
      }
    })
  }

  ngOnInit(): void {
    this.getFavsData()
  }
}
