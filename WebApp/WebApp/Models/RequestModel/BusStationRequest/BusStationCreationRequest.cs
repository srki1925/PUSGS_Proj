using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.RequestModel.BusStationRequest
{
    public class BusStationCreationRequest
    {

  
        public string Name { get; set; }
        public string Address { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }

    }
}