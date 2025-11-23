import { Routes } from '@angular/router';
import { ExpenseList } from './features/expense-list/expense-list';
import { AddExpense } from './features/add-expense/add-expense';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard},
  { path: 'expenses', component: ExpenseList },
  { path: 'add-expense', component: AddExpense },
];