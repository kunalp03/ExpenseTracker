import { Component, ViewChild } from '@angular/core';
import { ExpenseList } from '../expense-list/expense-list';
import { AddExpense } from '../add-expense/add-expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    AddExpense,
    ExpenseList
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  @ViewChild('list') list!: ExpenseList;

  onExpenseAdded(e: any) {
    // refresh the list when an expense is added
    this.list.loadExpenses();
  }
}
