import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../Shared/Components/card/card.component";
import { ProductsService } from '../../../../Core/Services/Products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
 loading:boolean=true
 productList:Product[]=[]
  private readonly productsService = inject(ProductsService)

  getAllProductsData(pageNumber:number=1):void{
    this.loading = true
    this.productsService.getAllProducts(pageNumber).subscribe(
      {next:(res)=>{
        this.productList=res.data
        this.loading = false;
      },error:(error)=>{
        this.loading = false;
        console.log(error);
      }}
    )
  }

  ngOnInit(): void {
    this.getAllProductsData()
    console.log('jh');
  }
}
