import { Token } from './../../Interfaces/token.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookiesService = inject(CookieService)
  private readonly router = inject(Router)
  token:Token = {} as Token

  userRegister(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/signup',data)
  }
  userLogin(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/signin',data)
  }

  logout():void{
    this.cookiesService.delete('token')
    this.router.navigate(['/login'])
  }

  verifyEmail(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/forgotPasswords',data)
  }
  verifyCode(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/verifyResetCode',data)
  }
  resetPassword(data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+'auth/resetPassword',data)
  }

  decodeToken(){
     try {
      this.token = jwtDecode(this.cookiesService.get('token'))
     } catch (error) {
      this.logout()
     }
     return this.token
  }
}
