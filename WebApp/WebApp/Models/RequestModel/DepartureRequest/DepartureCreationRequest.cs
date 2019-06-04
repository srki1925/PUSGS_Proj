using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models.RequestModel.DepartureRequest

{
    public class DepartureCreationRequest
    {
        public string Time { get; set; }

        public DayType DayType { get; set; }

        public string LineName { get; set; }
    }
}