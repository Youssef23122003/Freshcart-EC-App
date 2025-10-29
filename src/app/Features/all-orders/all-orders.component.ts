import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Auth/Services/auth.service';
import { Token } from '../../Core/Interfaces/token.interface';
import { CheckOutService } from '../check-out/services/check-out.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-all-orders',
  imports: [DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{

  ordersList:Order[] = []
 private readonly authService = inject(AuthService)

 private readonly checkout = inject(CheckOutService)
  token:Token = this.authService.decodeToken()
  userId:string = this.token.id

  getUserOrders():void{

    this.checkout.getAllOrders(this.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.ordersList = res
       
      },
      error:(err)=>{
        console.log(err);
       
      }
    })
  }

  ngOnInit(): void {
    this.getUserOrders()
  }
}
