import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { BrandsService } from './Services/brands.service';
import { BrandModalComponent } from "./Brand-Modal/brand-modal/brand-modal.component";

@Component({
  selector: 'app-brands',
  imports: [BrandModalComponent],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands implements OnInit {

brandsList:Brand[] = []
private readonly brandsService = inject(BrandsService)


getBrandsData():void{


  this.brandsService.getAllBrands().subscribe(
    {next:(res)=>{
      console.log(res.data);
      this.brandsList= res.data

    },
  error:(err)=>{
    console.log(err);

  }}
  )
}


@ViewChild(BrandModalComponent) myModal!:BrandModalComponent

  ngOnInit(): void {
    this.getBrandsData()
  }
}
