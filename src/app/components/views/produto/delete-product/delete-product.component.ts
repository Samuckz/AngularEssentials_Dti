import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  product!: Product;

  constructor(
    private service: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string
    
    this.service.readyById(id).subscribe((product) => {
      this.product = product;
    })
  }

  delete(): void{
    const id = this.route.snapshot.paramMap.get('id') as string
    this.service.delete(id).subscribe(() => {
      this.snackBar.open(
        "Produto deletado com sucesso!",
        "Fechar"
      )
      this.navigateProductsPage()
    })
  }

  navigateProductsPage(): void{
    this.router.navigate(['/products'])
  }

}
