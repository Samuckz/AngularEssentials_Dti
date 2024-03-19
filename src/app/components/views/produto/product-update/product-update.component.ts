import { SnackBarService } from '../../../../services/snackBar-service/snack-bar.service';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../../services/produto-service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../models/product.model';
import { Category } from 'src/app/models/category.model';
import { CategoryServiceService } from 'src/app/services/category-service/category-service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  
  product!: Product // inicialização opcional

  categories: String[] = []

  constructor(
    private service: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackService: SnackBarService,
    private categoryService: CategoryServiceService
  ) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    
    if(id !== null){
      this.service.readyById(id).subscribe((product) => {
        this.product = product;
      })
    }

    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response
    })
  }

  update(): void{
    this.service.update(this.product).subscribe(() => {
      this.snackService.createSnackBar("Produto atualizado com sucesso!")
      this.navigateProductsPage();
    })
    
  }

  navigateProductsPage(): void{
    this.router.navigate(['/products'])
  }

}
