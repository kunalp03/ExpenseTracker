namespace ExpenseTracker.ExpensesService.Models
{
    public class ExpenseResponseDto
    {
        public int ExpenseId { get; set; }
        public required string Title { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int? CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public string? Notes { get; set; }
    }
}