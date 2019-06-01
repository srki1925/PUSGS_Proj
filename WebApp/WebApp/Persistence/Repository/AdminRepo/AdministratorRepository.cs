using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.AdminRepo
{
    public class AdministratorRepository : Repository<Administrator, int>, IAdministratorRepository
    {
        public AdministratorRepository(DbContext context) : base(context)
        {
        }
    }
}