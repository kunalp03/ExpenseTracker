import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = 'http://localhost:5243/api/Categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.api);
  }
}