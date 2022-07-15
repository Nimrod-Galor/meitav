using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class Repo : IRepo
    {
        private readonly PersonContext _context;

        public Repo(PersonContext context)
        {
            _context = context;
        }

        public void CreatePerson(Person prs)
        {
            if(prs == null)
            {
                throw new ArgumentNullException(nameof(prs));
            }

            _context.Persons.Add(prs);
        }

        public IEnumerable<Person> GetAllPersons()
        {
            return _context.Persons.ToList();
        }

        public Person GetPersonByIdNum(string IdNum)
        {
            return _context.Persons.FirstOrDefault(p => p.IdNum == IdNum);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
