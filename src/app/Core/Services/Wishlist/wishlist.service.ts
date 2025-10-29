import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient)
   favCount:WritableSignal<number> = signal(0)

  addToWishlist(productId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'wishlist',{productId})
  }

  removeFromWishlist(productId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`wishlist/${productId}`)
  }

  getFromWishlist():Observable<any>{
    return this.httpClient.get(environment.baseUrl+'wishlist')
  }


}
