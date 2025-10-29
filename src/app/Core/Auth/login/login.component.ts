import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import {  FormGroup, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../Shared/Components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
msgError:string=""
eye:boolean= false
private readonly fb = inject(FormBuilder)
private readonly router = inject(Router)
private readonly authService = inject(AuthService)
private readonly cookieService = inject(CookieService)
subscribtion:Subscription= new Subscription()



loginForm!:FormGroup

initForm():void{
this.loginForm = this.fb.group({
  email:[null,[Validators.required,Validators.email]],
  password:[null,[
  Validators.required,
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)
]]
})
}

submit():void{
if(this.loginForm.valid){
  this.subscribtion.unsubscribe()

  console.log(this.loginForm.value);
  this.authService.userLogin(this.loginForm.value).subscribe(
    {next:(res)=>{
      console.log(res);

      this.cookieService.set('token',res.token)
     console.log(this.authService.decodeToken());

      this.router.navigate(['/home'])
    },
  error:(err)=>{
    console.log(err.error.message);
    this.msgError = err.error.message

  }}
  )
}else{
  this.loginForm.markAllAsTouched();
}
}

showPassword():void{
  this.eye = !this.eye
}

ngOnInit(): void {
  this.initForm()
}

}
