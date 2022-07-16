using API.Data;
using API.Dtos;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/persons")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly IRepo _repository;
        private readonly IMapper _mapper;

        public PersonsController(IRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        

        [HttpGet]
        public ActionResult<IEnumerable<Person>> GetAllPersons()
        {
            var personItems = _repository.GetAllPersons();

            return Ok(personItems);
        }

        [HttpGet("{IdNum}", Name = "GetPersonByIdNum")]
        public Person GetPersonByIdNum(string IdNum)
        {
            var prs = _repository.GetPersonByIdNum(IdNum);
            return prs;
        }

        [HttpPost]
        public ActionResult<Person> CreatePerson(CreatePersonDto personDto)
        {
            // check IdNum null
            if (personDto.IdNum == "")
            {
                return BadRequest(new { success = "false", message = "מספר ת.ז שדה חובה!" });
            }
            // check valid IdNum
            if (!IsValidIsraeliID(personDto.IdNum))
            {
                return BadRequest(new { success = "false", message = "מספר ת.ז לא תקין!" });
            }
            // check uniqe IdNum
            var prsExist = GetPersonByIdNum(personDto.IdNum);
            if(prsExist != null)
            {
                return BadRequest(new { success = "false", message = "מספר ת.ז קיים במערכת!" });
            }
            // check fullName null
            if (personDto.FullName == "")
            {
                return BadRequest(new { success = "false", message = "שדה שם מלא חובה!" });
            }
            // check fullName length
            if (personDto.FullName.Length > 20)
            {
                return BadRequest(new { success = "false", message = "שדה שם מלא ארוך מ20 תווים!" });
            }
            // check fullName valid
            string pattern = @"^[a-z \u0590-\u05fe]+$";
            Match m = Regex.Match(personDto.FullName, pattern, RegexOptions.IgnoreCase);
            if (!m.Success)
            {
                return BadRequest(new { success = "false", message = "שדה שם מלא מכיל תווים לא חוקיים!" });
            }
            // check birthDAte null
            if(personDto.BirthDate == null)
            {
                return BadRequest(new { success = "false", message = "שדה תאריך לידה חובה!" });
            }

            Person prs = _mapper.Map<Person>(personDto);

            _repository.CreatePerson(prs);
            _repository.SaveChanges();

            return CreatedAtRoute(nameof(GetPersonByIdNum), new { IdNum = prs.IdNum }, prs);
        }

        public static bool IsValidIsraeliID(string israeliID)
        {
            if (israeliID.Length != 9)
                return false;

            long sum = 0;

            for (int i = 0; i < israeliID.Length; i++)
            {
                var digit = israeliID[israeliID.Length - 1 - i] - '0';
                sum += (i % 2 != 0) ? GetDouble(digit) : digit;
            }

            return sum % 10 == 0;

            int GetDouble(long i)
            {
                switch (i)
                {
                    case 0: return 0;
                    case 1: return 2;
                    case 2: return 4;
                    case 3: return 6;
                    case 4: return 8;
                    case 5: return 1;
                    case 6: return 3;
                    case 7: return 5;
                    case 8: return 7;
                    case 9: return 9;
                    default: return 0;
                }
            }
        }
    }
}
