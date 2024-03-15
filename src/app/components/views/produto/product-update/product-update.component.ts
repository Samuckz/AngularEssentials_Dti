import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  
  product!: Product // inicialização opcional

  constructor(
    private service: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    
    if(id !== null){
      this.service.readyById(id).subscribe((product) => {
        this.product = product;
      })
    }
  }

  update(): void{
    this.service.update(this.product).subscribe(() => {
      this.snackBar.open(
        "Produto atualizado com sucesso",
        "Fechar"
      )
      this.navigateProductsPage();
    })
    
  }

  navigateProductsPage(): void{
    this.router.navigate(['/products'])
  }

}
