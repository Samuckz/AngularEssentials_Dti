import { Product } from '../../models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { pageable } from 'src/app/models/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private readonly API = "http://localhost:3001/products"

  constructor(
    private http: HttpClient
  ) { }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.API, product);
  }

  read( pagina: number, tamanhoDaPagina: number ): Observable<pageable>{
    
    let params = new HttpParams()
    .set('_page', pagina)
    .set('_per_page', tamanhoDaPagina)
    return this.http.get<pageable>(this.API, {params: params})
  }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.API)
  }

  readyById(id: string): Observable<Product>{
    const urlConsultada = `${this.API}/${id}`
    return this.http.get<Product>(urlConsultada).pipe(
      map(obj => obj)
    )
  }

  update(product: Product): Observable<Product>{
    const urlConsultada = `${this.API}/${product.id}`
    return this.http.put<Product>(urlConsultada, product)
  }

  delete(id: string): Observable<Product>{
    const urlConsultada = `${this.API}/${id}`
    return this.http.delete<Product>(urlConsultada)
  }

}
