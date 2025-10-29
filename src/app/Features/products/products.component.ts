import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/Products/products.service';
import { CardComponent } from "../../Shared/Components/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../Core/Pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [CardComponent,NgxPaginationModule,SearchPipe,FormsModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit  {
  text:string = ''

  pageSize!:number
  p!:number
  total!:number

 productList:Product[]=[]
  private readonly productsService = inject(ProductsService)
  private readonly ngxSpinnerServive = inject(NgxSpinnerService)

  getAllProductsData(pageNumber : number = 1):void{
    this.ngxSpinnerServive.show()

    this.productsService.getAllProducts(pageNumber).subscribe(
      {next:(res)=>{
        this.productList=res.data
        this.pageSize = res.metadata.limit
        this.p = res.metadata.currentPage
        this.total = res.results
       
        // this.loading = false;
      },error:(error)=>{

        // this.loading = false;
        console.log(error);
      }}
    )
  }

  ngOnInit(): void {
    this.getAllProductsData()

  }


}

