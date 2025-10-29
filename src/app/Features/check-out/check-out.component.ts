import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../Shared/Components/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutService } from './services/check-out.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css'
})
export class CheckOut implements OnInit {
private readonly fb = inject(FormBuilder)
private readonly checkoutService = inject(CheckOutService)
private readonly activatedRoute = inject(ActivatedRoute)
private readonly router = inject(Router)
cartId : string | null = null

msgError:string=''
checkoutForm!:FormGroup

initForm(): void {
this.checkoutForm = this.fb.group({
  shippingAddress : this.fb.group({ details:[null,[Validators.required]],
  phone:[null,[Validators.required,Validators.pattern(/^(?:\+20|0020|0)?1[0-2|5]\d{8}$/)]],
  city:[null,[Validators.required]]})

})
}

getCartId():void{
  this.activatedRoute.paramMap.subscribe(
    {next:(params)=>{
      this.cartId = params.get('id')
      console.log(this.cartId);

    }}
  )
}

submitCheckout():void{

if(this.checkoutForm.valid){

  console.log(this.checkoutForm.value);
  this.checkoutService.checkoutVisa(this.cartId,this.checkoutForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      window.open(res.session.url,'_self')

    },
    error:(err)=>{
      console.log(err);

    }
  })

}else{
  this.checkoutForm.markAllAsTouched()
}
}


ngOnInit(): void {
  this.initForm()
  this.getCartId()
}
}
