using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ACourseController : ControllerBase
    {
        private readonly AdvanDBContext _context;

        public ACourseController(AdvanDBContext context)
        {
            _context = context;
        }

        // GET: api/ACourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ACourse>>> GetACourse()
        {
            return await _context.ACourse.ToListAsync();
        }

        // GET: api/ACourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ACourse>> GetACourse(Guid id)
        {
            var aCourse = await _context.ACourse.FindAsync(id);

            if (aCourse == null)
            {
                return NotFound();
            }

            return aCourse;
        }

        // PUT: api/ACourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutACourse(Guid id, ACourse aCourse)
        {
            aCourse.Id = id;

            _context.Entry(aCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ACourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ACourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ACourse>> PostACourse(ACourse aCourse)
        {
            _context.ACourse.Add(aCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetACourse", new { id = aCourse.Id }, aCourse);
        }

        // DELETE: api/ACourses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ACourse>> DeleteACourse(Guid id)
        {
            var aCourse = await _context.ACourse.FindAsync(id);
            if (aCourse == null)
            {
                return NotFound();
            }

            _context.ACourse.Remove(aCourse);
            await _context.SaveChangesAsync();

            return aCourse;
        }

        private bool ACourseExists(Guid id)
        {
            return _context.ACourse.Any(e => e.Id == id);
        }
    }
}
