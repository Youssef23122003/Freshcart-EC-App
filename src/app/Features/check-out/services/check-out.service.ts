import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private readonly httpClient = inject(HttpClient)

  private readonly cookiesService = inject(CookieService)



  checkoutCash(cartId:string | null,shipping:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `orders/${cartId}`,shipping)
  }
  checkoutVisa(cartId:string | null,shipping:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${cartId}?url=http://localhost:4200`,shipping)
  }

  getAllOrders(userId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `orders/user/${userId}`)
  }
}
