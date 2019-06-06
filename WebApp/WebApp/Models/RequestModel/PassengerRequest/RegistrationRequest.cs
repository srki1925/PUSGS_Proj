using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models.RequestModel.PassengerRequest
{
    public class RegistrationRequest
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }
        public string ImageUri { get; set; }
        public PassengerType PassengerType { get; set; }
    }
}