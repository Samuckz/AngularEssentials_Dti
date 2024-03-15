import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/components/views/produto/services/product-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private service: ProductServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
  }

  salvar(): void{
    this.service.create(this.product).subscribe(
      () => {
        this.snackBar.open(
          "Produto cadastrado com sucesso!",
          "Fechar" 
        )
        this.navigateProductsPage() 
      }
    )
    
  }

  navigateProductsPage(): void{
    this.router.navigate(['/products'])
  }


}
