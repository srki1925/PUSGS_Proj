using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models
{

    public class Putnik:Korisnik
    {
        public Putnik()
        {
            UserType = UserType.Putnik;
        }
        public PutnikType PutnikType { get; set; }
        public bool Active { get; set; }
        public string ImageUri { get; set; }
    }
}