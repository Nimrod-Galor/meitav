using API.Dtos;
using API.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Profiles
{
    public class PersonProfile: Profile
    {
        public PersonProfile()
        {
            CreateMap<CreatePersonDto, Person>();
        }
    }
}
