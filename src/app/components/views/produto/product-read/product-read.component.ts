import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../../services/produto-service/product-service.service';
import { Product } from '../../../../models/product.model';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = []
  displayedColumns = ['id', 'name', 'price', 'category' ,'action']
  dataSource = new MatTableDataSource<Product>();
  


  constructor(
    private service: ProductServiceService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.service.read().subscribe((products) => {
      this.products = products
      this.dataSource.data = products
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewChecked(){ // Validar questão do Init ou Checked   
    if(this.sort){       
      // console.log("Sort configurado");
      this.dataSource.sort = this.sort;
    }
  }

  liveAnnouncer(sortState: Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce(
        `Sorted ${sortState.direction} ending`  
      )
      console.log("Ordenação Ligada");
    } else{
      this._liveAnnouncer.announce('Ordenação finalizada')
      console.log("Ordenação Desligada");
    }
    
  }

}