import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Expense } from '../../core/models/expense.model';
import { ExpenseService } from '../../core/services/expense.service';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-expense-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList implements OnInit{

  columns = ['date', 'title', 'amount', 'category'];
  dataSource = new MatTableDataSource<Expense>([]);
  categories: any[] = [];
  monthlyTotal = 0;
  expenses: Expense[] = [];

  constructor(private expenseSvc: ExpenseService, private catSvc: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadExpenses();
  }

  loadCategories() {
    this.catSvc.getCategories().subscribe(c => this.categories = c);
  }

  loadExpenses() {
    this.expenseSvc.getAll().subscribe(list => {
      // parse dates if needed
      this.expenses = list;
      this.dataSource = new MatTableDataSource(this.expenses);
      this.calculateMonthlyTotal();
    });
  }

  applyFilter(text: string) {
    const q = text.trim().toLowerCase();
    this.dataSource.filter = q;
    this.dataSource.filterPredicate = (data: Expense, filter: string) => {
      return data.title.toLowerCase().includes(filter) || (data.notes || '').toLowerCase().includes(filter);
    };
  }

  filterByCategory(catId: number | null) {
    if (!catId) {
      this.loadExpenses();
      return;
    }
    this.dataSource.data = this.dataSource.data.filter(e => e.categoryId === catId);
    this.calculateMonthlyTotal();
  }

  calculateMonthlyTotal() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    this.monthlyTotal = this.dataSource.data
      .filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((s, e) => s + Number(e.amount || 0), 0);
  }
}
