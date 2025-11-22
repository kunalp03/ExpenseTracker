import { Injectable } from "@angular/core";
import { Expense } from "../models/expense.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private api = 'http://localhost:5083/api/Expenses';

  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Expense[]>(this.api); }
  get(id: number) { return this.http.get<Expense>(`${this.api}/${id}`); }
  add(expense: Expense) { return this.http.post(this.api, expense); }
  update(id: number, expense: Expense) { return this.http.put(`${this.api}/${id}`, expense); }
  delete(id: number) { return this.http.delete(`${this.api}/${id}`); }
}