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
    public class AClassController : ControllerBase
    {
        private readonly AdvanDBContext _context;

        public AClassController(AdvanDBContext context)
        {
            _context = context;
        }

        // GET: api/AClass
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AClass>>> GetAClass()
        {
            var a = await _context.AClass.ToListAsync();
            //a.Where(x => x.ACourse.courseId == param)
            return a;
        }

        // GET: api/AClass/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AClass>> GetAClass(Guid id)
        {
            var aClass = await _context.AClass.FindAsync(id);

            if (aClass == null)
            {
                return NotFound();
            }

            return aClass;
        }

        // PUT: api/AClass/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAClass(Guid id, AClass aClass)
        {
            aClass.Id = id;
            aClass.ACourse = await _context.ACourse.FindAsync(aClass.ACourseId);

            _context.Entry(aClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AClassExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAClass", new { id = aClass.Id }, aClass);
        }

        // POST: api/AClass
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AClass>> PostAClass(AClass aClass)
        {
            aClass.ACourse = await _context.ACourse.FindAsync(aClass.ACourseId);
            _context.AClass.Add(aClass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAClass", new { id = aClass.Id }, aClass);
        }

        // DELETE: api/AClass/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AClass>> DeleteAClass(Guid id)
        {
            var aClass = await _context.AClass.FindAsync(id);
            if (aClass == null)
            {
                return NotFound();
            }

            _context.AClass.Remove(aClass);
            await _context.SaveChangesAsync();

            return aClass;
        }

        private bool AClassExists(Guid id)
        {
            return _context.AClass.Any(e => e.Id == id);
        }
    }
}
