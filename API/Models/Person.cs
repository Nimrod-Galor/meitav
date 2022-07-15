using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Person
    {
        [Required]
        [MaxLength(20)]
        public string FullName { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Key]
        [MaxLength(9)]
        public string IdNum {get;set;}
    }
}
