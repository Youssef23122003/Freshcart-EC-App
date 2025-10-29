import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../../Shared/Components/input/input.component";
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword implements OnInit {
msgError:string=""
private readonly fb = inject(FormBuilder)
private readonly authServie = inject(AuthService)
private readonly cookiesServie = inject(CookieService)
private readonly router = inject(Router)
forgetForm!:FormGroup
verifyForm!:FormGroup
resetForm!:FormGroup
step:number = 1

initForms():void{
 this.forgetForm =  this.fb.group({
  email:[null,[Validators.required,Validators.email]]
 })

 this.verifyForm = this.fb.group({
  resetCode:[null,[Validators.required]]
 })

 this.resetForm = this.fb.group({
   email:[null,[Validators.required,Validators.email]],
   newPassword:[null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)]]
 })
}

submitForget():void{
if(this.forgetForm.valid){
  console.log(this.forgetForm.value);
  this.authServie.verifyEmail(this.forgetForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step=2
    }
  })
}
else{
  this.forgetForm.markAllAsTouched()
}
}

submitCode():void{
if(this.verifyForm.valid){
  console.log(this.verifyForm.value);
  this.authServie.verifyCode(this.verifyForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step=3
    }
  })
}
else{
  this.verifyForm.markAllAsTouched()
}

}
submitReset():void{
if(this.resetForm.valid){
  console.log(this.resetForm.value);
  this.authServie.resetPassword(this.resetForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.cookiesServie.set('token',res.token)
      this.router.navigate(['/home'])
    }
  })
}
else{
  this.resetForm.markAllAsTouched()
}
}

ngOnInit(): void {
  this.initForms()
}

}
