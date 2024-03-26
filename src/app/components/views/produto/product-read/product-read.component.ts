import { pageable } from './../../../../models/pageable.model';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../../services/produto-service/product-service.service';
import { Product } from '../../../../models/product.model';
import {ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  constructor(
    private service: ProductServiceService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  products: Product[] = []
  pageable: pageable = {
    first: 0,
    prev: null,
    next: null,
    last: 0,
    pages: null,
    items: 0,
    data: []
  }
  displayedColumns = ['id', 'name', 'price', 'category' ,'action']
  dataSource = new MatTableDataSource<Product>();
  pageIndex = 1
  pageSize = 3
  pageLength = 0

  ngOnInit(): void {

    this.carregaProdutosPaginator(this.pageIndex, this.pageSize)
    this.countProducts(); 

    this.pageLength = this.products.length

    console.log(this.products);
    console.log(this.dataSource.data);
    
  }

  ngAfterViewInit(): void{    
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }  
  }
  
  ngAfterViewChecked(){ // Validar questão do Init ou   
    if(this.sort){       
      this.dataSource.sort = this.sort;
    }
  }

  carregaProdutosPaginator(pageIndex: number, pageSize: number){
    this.service.read(
      this.pageIndex, this.pageSize
    ).subscribe((pageable) => {
      this.pageable = pageable
      this.dataSource.data = pageable.data
      
    });
  }

  countProducts(){
    this.service.getAllProducts().subscribe(response => {
      this.products = response
      this.pageLength = response.length
    })
  }

  getPageDetails(event: { pageIndex: number; pageSize: number}) {
    switch(event.pageIndex){
      case 0:
        this.pageIndex = 1;
        break;
      case 1:
        this.pageIndex = 2;
        break;
      case 2:
        this.pageIndex = 3;
        break;
      case 3:
        this.pageIndex = 4;
        break;
    }

    this.pageSize = event.pageSize;
    this.carregaProdutosPaginator(event.pageIndex, event.pageSize)
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