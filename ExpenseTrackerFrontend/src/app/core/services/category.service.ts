import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = environment.api.categories;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.api);
  }
}