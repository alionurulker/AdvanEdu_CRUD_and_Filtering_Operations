using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class AStudent
    {
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Surname { get; set; }
        public Guid AClassId { get; set; }
        public virtual AClass AClass { get; set; }
    }

    public class EditAStudentDTO
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Guid AClassId { get; set; }

    }

    public class FilterAStudentDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Guid? AClassId { get; set; }
        public Guid? ACourseId { get; set; }

    }

    public class ViewAStudentDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string AClassName { get; set; }
        public Guid AClassId { get; set; }
        public string ACourseName { get; set; }
        public Guid ACourseId { get; set; }
    }


}