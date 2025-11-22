using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseService.Models
{
    [Table("Categories")]   // <-- matches actual DB table name
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; } = string.Empty;
    }
}