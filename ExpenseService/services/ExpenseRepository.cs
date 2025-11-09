using ExpenseService.Models;
using ExpenseTracker.ExpensesService.Data;
using Microsoft.EntityFrameworkCore;

namespace ExpenseService.Services
{
    public class ExpenseRepository
    {
        private readonly AppDbContext _context;

        public ExpenseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
            => await _context.Expenses.OrderByDescending(e => e.Date).ToListAsync();

        public async Task<Expense?> GetByIdAsync(int id)
            => await _context.Expenses.FindAsync(id);

        public async Task AddAsync(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Expense expense)
        {
            _context.Entry(expense).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense != null)
            {
                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();
            }
        }
    }
}
