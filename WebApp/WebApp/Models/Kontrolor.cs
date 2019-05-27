using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Kontrolor:Korisnik
    {
        public Kontrolor()
        {
            UserType = UserType.Kotrolor;
        }
    }
}