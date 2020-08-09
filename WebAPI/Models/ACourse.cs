using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public partial class ACourse
    {
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string courseName { get; set; }

        public virtual List<AClass> AClasses { get; set; }
    }

    public partial class ACourseForInClass
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string courseName { get; set; }

        public ICollection<AClass> AClasses { get; set; }
    }
    
}