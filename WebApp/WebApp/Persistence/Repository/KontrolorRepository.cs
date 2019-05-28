using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository
{
    public class KontrolorRepository : Repository<Kontrolor, int>, IKontrolorRepository
    {
        public KontrolorRepository(DbContext context) : base(context)
        {
        }
    }
}