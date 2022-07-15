using API.Helper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
    public class Person
    {
        public string FullName { get; set; }
        [JsonConverter(typeof(NullableDateTimeConverter))]
        public DateTime? BirthDate { get; set; }
        [Key]
        [MaxLength(9)]
        public string IdNum {get;set;}
    }
}
