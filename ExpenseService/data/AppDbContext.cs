using Microsoft.EntityFrameworkCore;
using ExpenseService.Models;

namespace ExpenseTracker.ExpensesService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Expense> Expenses { get; set; }  // this will represent your Expenses table
    }
}