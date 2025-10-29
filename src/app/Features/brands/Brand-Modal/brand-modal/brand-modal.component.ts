import { Component, inject } from '@angular/core';
import { BrandsService } from '../../Services/brands.service';

@Component({
  selector: 'app-brand-modal',
  imports: [],
  templateUrl: './brand-modal.component.html',
  styleUrl: './brand-modal.component.css'
})
export class BrandModalComponent {
openModel:boolean=false
private readonly brandsService = inject(BrandsService)
brand:Brand = {} as Brand
loading:boolean=false
openBrandModal(id:string):void{
 console.log('sss');
  this.openModel=true
  this.getBrandDetails(id)
}

closeBrandModal():void{

  this.openModel=false
}

getBrandDetails(id:string):void{
this.loading=true
this.brandsService.getSpecificBrand(id).subscribe({
  next:(res)=>{
    console.log(res.data);
    this.brand = res.data
    this.loading=false
  },
  error:()=>{
    this.loading=false
  }
})
}
}
