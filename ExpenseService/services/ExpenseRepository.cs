using ExpenseService.Models;
using ExpenseTracker.ExpensesService.Data;
using ExpenseTracker.ExpensesService.Models;
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

        public async Task<IEnumerable<ExpenseResponseDto>> GetAllAsync()
            => await _context.Expenses.Include(e => e.Category)
            .Select(e => new ExpenseResponseDto
            {
                ExpenseId = e.ExpenseId,
                Title = e.Title,
                Amount = e.Amount,
                Date = e.Date,
                CategoryId = e.CategoryId,
                CategoryName = e.Category != null ? e.Category.CategoryName : null,
                Notes = e.Notes
            }).ToListAsync();
        public async Task<ExpenseResponseDto?> GetByIdAsync(int id)
            => await _context.Expenses.Include(e => e.Category)
            .Where(e => e.ExpenseId == id)
            .Select(e => new ExpenseResponseDto
            {
                ExpenseId = e.ExpenseId,
                Title = e.Title,
                Amount = e.Amount,
                Date = e.Date,
                CategoryId = e.CategoryId,
                CategoryName = e.Category != null ? e.Category.CategoryName : null,
                Notes = e.Notes
            })
            .FirstOrDefaultAsync();

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
