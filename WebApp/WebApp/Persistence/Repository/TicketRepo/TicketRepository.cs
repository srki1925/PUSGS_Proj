using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepo
{
    public class TicketRepository : Repository<TIcket, int>, ITicketRepository
    {
        public TicketRepository(DbContext context) : base(context)
        {
        }
    }
}