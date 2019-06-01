using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepo
{
    public interface ITicketRepository:IRepository<TIcket,int>
    {
    }
}