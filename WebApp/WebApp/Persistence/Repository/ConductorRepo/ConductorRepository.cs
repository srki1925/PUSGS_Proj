using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository
{
    public class ConductorRepository : Repository<Conductor, int>, IConductorRepository
    {
        public ConductorRepository(DbContext context) : base(context)
        {
        }
    }
}