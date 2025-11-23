import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../core/models/category.model';
import { ExpenseService } from '../../core/services/expense.service';
import { CategoryService } from '../../core/services/category.service';
import { Expense } from '../../core/models/expense.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-expense',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {

  @Output() expenseAdded = new EventEmitter<void>();
  categories: Category[] = [];
  saving = false;
  form: FormGroup;

  
  constructor(
    private fb: FormBuilder,
    private catSvc: CategoryService,
    private expenseSvc: ExpenseService
  ) {
    this.form = this.fb.nonNullable.group({
      title: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: [new Date(), Validators.required],
      categoryId: [null],
      notes: ['']
    });

  }


  ngOnInit() {
    this.catSvc.getCategories().subscribe(c => this.categories = c);
  }

  submit() {
    if (this.form.invalid) return;
    this.saving = true;

    const raw = this.form.getRawValue();

    const payload: Expense = {
      title: raw.title ?? '',
      amount: raw.amount ?? 0,
      date: (raw.date as Date).toISOString(),
      categoryId: raw.categoryId ?? null,
      notes: raw.notes ?? ''
    };

    this.expenseSvc.add(payload).subscribe({
      next: () => {
        this.saving = false;
        this.form.reset({ amount: 0, date: new Date() });
        this.expenseAdded.emit();
      },
      error: () => { this.saving = false; /* show toast later */ }
    });
  }
}
