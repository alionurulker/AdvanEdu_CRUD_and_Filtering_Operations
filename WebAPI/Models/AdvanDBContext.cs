using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class AdvanDBContext : DbContext
    {
        public AdvanDBContext(DbContextOptions<AdvanDBContext> options) : base(options)
        {

        }
        public DbSet<AStudent> AStudent { get; set; }
        public DbSet<ACourse> ACourse { get; set; }
        public DbSet<AClass> AClass { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AStudent>().Property(x => x.Id).HasDefaultValueSql("newid()");

            modelBuilder.Entity<AClass>().Property(x => x.Id).HasDefaultValueSql("newid()");

            modelBuilder.Entity<AClass>().HasMany(x => x.AStudents).WithOne(x => x.AClass).HasForeignKey(x => x.AClassId);

            modelBuilder.Entity<ACourse>().Property(x => x.Id).HasDefaultValueSql("newid()");
            modelBuilder.Entity<ACourse>().HasMany(x => x.AClasses).WithOne(x => x.ACourse).HasForeignKey(x => x.ACourseId);

        }
    }
}
