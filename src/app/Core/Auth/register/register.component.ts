import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AuthService } from '../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../Shared/Components/input/input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

msgError:string=""

eye:boolean= false
private readonly router = inject(Router)
private readonly authService = inject(AuthService)
private readonly fb = inject(FormBuilder)

registerForm!:FormGroup

initForm():void{
this.registerForm = this.fb.group({
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[
 Validators.required,
 Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)]],
 rePassword:[null,[
  Validators.required,
 ]],
  phone:[null,[Validators.required,Validators.pattern(/^(?:\+20|0020|0)?1[0-2|5]\d{8}$/)]]
},{validators:this.confirmPassword})
}

submit():void{
if(this.registerForm.valid){

 console.log(this.registerForm.value)
  this.authService.userRegister(this.registerForm.value).subscribe({
    next:(res)=>{
      console.log(res);

      this.router.navigate(['/login'])
    },error:(err)=> {
      console.log(err.error.message);
    
      this.msgError=err.error.message

    }
  })
}
else{
  this.registerForm.setErrors({mismatch:true})
  // this.registerForm.get('rePassword')?.patchValue(null)
  this.registerForm.markAllAsTouched();
}

}

confirmPassword(group:AbstractControl){
  if(group.get('password')?.value === group.get('rePassword')?.value){
        return null
  }
  else{
      group.get('rePassword')?.setErrors({mismatch:true})
      return {mismatch:true}
  }

}

showPassword():void{
  this.eye = !this.eye

}


ngOnInit(): void {
  this.initForm()
}
}
