﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IPutnikRepository PutnikServices { get; set; }
        IAdministratorRepository AdministratorServices { get; set; }
        int Complete();
    }
}
