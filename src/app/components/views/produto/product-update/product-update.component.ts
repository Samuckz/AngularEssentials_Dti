import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { NOTFOUND } from 'dns';
import { subscribeOn } from 'rxjs';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string
    
    this.service.readyById(id).subscribe((product) => {
      this.product = product;
    })
  }

  update(): void{
    this.service.update(this.product).subscribe(() => {
      this.router.navigate(['/products']);
    })
    
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }

}
