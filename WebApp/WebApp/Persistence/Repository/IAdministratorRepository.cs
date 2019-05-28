using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository
{
    public interface IAdministratorRepository:IRepository<Administrator,int>
    {
    }
}