
import { SnackBarService } from '../../../../services/snackBar-service/snack-bar.service';
import { Product } from '../../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/produto-service/product-service.service';
import { CategoryServiceService } from 'src/app/services/category-service/category-service.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = {
    name: '',
    price: null,
    category: null
  }

  categories: Category[] = []

  constructor(
    private service: ProductServiceService,
    private router: Router,
    private snackService: SnackBarService,
    private categoryService: CategoryServiceService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories
    })

    console.log(this.categories);
    
  }

  salvar(): void{
    this.service.create(this.product).subscribe(
      () => {
        this.snackService.createSnackBar("Produto cadastrado com sucesso!")
        this.navigateProductsPage() 
      }
    )
    
  }

  navigateProductsPage(): void{
    this.router.navigate(['/products'])
  }


}
