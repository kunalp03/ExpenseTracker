using Microsoft.AspNetCore.Mvc;
using ExpenseService.Models;
using ExpenseService.Services;

namespace ExpenseService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseRepository _repo;

        public ExpenseController(ExpenseRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var expense = await _repo.GetByIdAsync(id);
            return expense == null ? NotFound() : Ok(expense);
        }

        [HttpPost]
        public async Task<IActionResult> AddExpenseAsync(Expense expense)
        {
            await _repo.AddAsync(expense);
            return CreatedAtAction(nameof(GetById), new { id = expense.ExpenseId }, expense);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Expense expense)
        {
            if (id != expense.ExpenseId) return BadRequest();
            await _repo.UpdateAsync(expense);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}
