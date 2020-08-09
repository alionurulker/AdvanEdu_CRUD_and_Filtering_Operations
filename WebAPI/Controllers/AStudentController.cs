using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AStudentController : ControllerBase
    {
        private readonly AdvanDBContext _context;
        private readonly IMapper _mapper;


        public AStudentController(AdvanDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/AStudent
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AStudent>>> GetAStudent(string Name, string Surname, string ClassName, string CourseName)
        {
            return await _context.AStudent.Where(student =>
              (String.IsNullOrEmpty(Name) ? true : student.Name.ToUpper().Contains(Name.ToUpper())) &&
              (String.IsNullOrEmpty(Surname) ? true : student.Surname.ToUpper().Contains(Surname.ToUpper())) &&
              (String.IsNullOrEmpty(ClassName) ? true : student.AClass.className.ToUpper().Contains(ClassName.ToUpper())) &&
              (String.IsNullOrEmpty(CourseName) ? true : student.AClass.ACourse.courseName.ToUpper().Contains(CourseName.ToUpper())) 
                 ).OrderBy(student=>student.Name).ToListAsync();
        }

        // GET: api/AStudent/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AStudent>> GetAStudent(Guid id)
        {
            var aStudent = await _context.AStudent.FindAsync(id);

            if (aStudent == null)
            {
                return NotFound();
            }

            return aStudent;
        }

        // PUT: api/AStudent/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<AStudent>> PutAStudent(Guid id, AStudent aStudent)
        {

            aStudent.Id = id;
            aStudent.AClass = await _context.AClass.FindAsync(aStudent.AClassId);

            _context.Entry(aStudent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AStudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAStudent", new { id = aStudent.Id }, aStudent);
        }

        // POST: api/AStudent
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AStudent>> PostAStudent(AStudent aStudent)
        {
            aStudent.AClass = await _context.AClass.FindAsync(aStudent.AClassId);
            _context.AStudent.Add(aStudent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAStudent", new { id = aStudent.Id }, aStudent);
        }

        // DELETE: api/AStudent/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AStudent>> DeleteAStudent(Guid id)
        {
            var aStudent = await _context.AStudent.FindAsync(id);
            if (aStudent == null)
            {
                return NotFound();
            }

            _context.AStudent.Remove(aStudent);
            await _context.SaveChangesAsync();

            return aStudent;
        }

        private bool AStudentExists(Guid id)
        {
            return _context.AStudent.Any(e => e.Id == id);
        }
    }
}
