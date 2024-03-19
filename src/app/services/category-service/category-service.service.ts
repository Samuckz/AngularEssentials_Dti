import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private readonly categoriesAPI = "http://localhost:3001/categories"

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories(): Observable<String[]>{
    return this.httpClient.get<String[]>(this.categoriesAPI);
  }

}
