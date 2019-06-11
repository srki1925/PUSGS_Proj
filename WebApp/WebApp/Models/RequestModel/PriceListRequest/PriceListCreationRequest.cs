using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.RequestModel.PriceListRequest
{
    public class PriceListCreationRequest
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public List<int> PriceListItems { get; set; }

    }
}