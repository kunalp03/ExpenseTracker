import { Category } from './category.model';

export interface Expense {
  expenseId: number;
  title: string;
  amount: number;
  expenseDate: string;
  categoryId: number;
  category?: Category;
}