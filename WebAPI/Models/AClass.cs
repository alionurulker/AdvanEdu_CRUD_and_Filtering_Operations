using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public partial class AClass
    {
        public Guid Id {get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string className { get; set; }

        public virtual List<AStudent> AStudents { get; set; }
        public virtual ACourse ACourse { get; set; }
        public Guid ACourseId { get; set; }

    }

    public partial class LiteAClass_DTO
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string className { get; set; }

        public int ACourseId { get; set; }
    }
}