using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models.Users
{
    public class Administrator:Korisnik
    {
        public Administrator()
        {
            UserType = UserType.Administrator;
        }
    }
}