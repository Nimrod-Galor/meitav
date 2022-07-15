using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public interface IRepo
    {
        bool SaveChanges();
        IEnumerable<Person> GetAllPersons();
        Person GetPersonByIdNum(string IdNum);

        void CreatePerson(Person prs);
    }
}
