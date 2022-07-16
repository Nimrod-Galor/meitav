using API.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CreatePersonDto
    {
        public string FullName { get; set; }
        [JsonConverter(typeof(NullableDateTimeConverter))]
        public DateTime? BirthDate { get; set; }
        public string IdNum { get; set; }
    }
}
