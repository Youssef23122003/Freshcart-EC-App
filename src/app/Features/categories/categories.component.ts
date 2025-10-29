import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../Core/Services/Categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
 
  categoriesList:Category[]= []
  private readonly categoriesService = inject(CategoriesService)

   getAllCategoriesData():void{

    this.categoriesService.getAllCategories().subscribe(
      {
        next:(res)=>{
          console.log(res.data);
          this.categoriesList=res.data

        },
        error:(err)=>{
          console.log(err);

        }
      }
    )
  }

  ngOnInit(): void {
this.getAllCategoriesData()
  }
}
