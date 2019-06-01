using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository.PriceListRepo
{
    public class PriceListRepository:Repository<PriceList,int>,IPriceListRepository
    {
    }
}