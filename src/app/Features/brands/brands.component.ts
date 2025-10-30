import { AfterViewInit, Component, inject, OnInit, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { BrandsService } from './Services/brands.service';
import { BrandModalComponent } from "./Brand-Modal/brand-modal/brand-modal.component";
import { isPlatformBrowser } from '@angular/common';
import Aos from 'aos';

@Component({
  selector: 'app-brands',
  imports: [BrandModalComponent],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands implements OnInit ,AfterViewInit  {

brandsList:Brand[] = []
private readonly brandsService = inject(BrandsService)
 private readonly id= inject(PLATFORM_ID)


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

  ngAfterViewInit(): void {
     if (isPlatformBrowser(this.id)) {
      Aos.init({
        duration: 1000,
        once: true,
         easing: 'ease-in-out',
      });
    }
  }
}
