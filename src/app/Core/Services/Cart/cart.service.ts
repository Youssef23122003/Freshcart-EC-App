import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount:WritableSignal<number> = signal(0)
  private readonly httpClient = inject(HttpClient)


  addProductToCart(productId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'cart',{productId})
  }

  getUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+'cart')
  }

  removeProductFromCart(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`cart/${id}`)
  }

  updateProductCart(id:string,count:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`cart/${id}`,{count})
  }

}
