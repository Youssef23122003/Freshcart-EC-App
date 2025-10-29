import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly httpclient = inject(HttpClient)

  getAllBrands():Observable<any>{
    return this.httpclient.get(environment.baseUrl + 'brands')
  }

  getSpecificBrand(id:string):Observable<any>{
    return this.httpclient.get(environment.baseUrl + `brands/${id}`)
  }
}
