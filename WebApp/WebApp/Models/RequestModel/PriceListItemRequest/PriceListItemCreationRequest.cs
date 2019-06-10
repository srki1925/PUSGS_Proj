using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.RequestModel.PriceListItemRequest
{
    public class PriceListItemCreationRequest
    {
        public TicketType TicketType { get; set; }
        public int Price { get; set; }
    }
}