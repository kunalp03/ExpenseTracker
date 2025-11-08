using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.ExpensesService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Expense> Expenses { get; set; }  // this will represent your Expenses table
        public DbSet<Category> Categories { get; set; }  // this will represent your Categories table
    }

    // Temporary placeholder models
    public class Expense
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
    }

    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}