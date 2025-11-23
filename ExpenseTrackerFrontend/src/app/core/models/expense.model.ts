import { Category } from './category.model';

export interface Expense {
  expenseId?: number;
  title: string;
  amount: number;
  date: string;        // ISO string (bind to date input)
  categoryId?: number;
  notes?: string;
  categoryName?: string; // optional for display
  category?: Category;   // optional nested
}