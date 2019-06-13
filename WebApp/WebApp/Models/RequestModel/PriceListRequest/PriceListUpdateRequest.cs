using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.RequestModel.PriceListRequest
{
    public class PriceListUpdateRequest
    {
        public int Id { get; set; }
        public List<int> PriceListItems { get; set; }
    }
}