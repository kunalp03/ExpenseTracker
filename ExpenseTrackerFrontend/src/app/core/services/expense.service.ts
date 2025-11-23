import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private api = environment.api.expenses;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.api);
  }

  get(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.api}/${id}`);
  }

  add(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.api, expense);
  }

  update(id: number, expense: Expense) {
    return this.http.put(`${this.api}/${id}`, expense);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}