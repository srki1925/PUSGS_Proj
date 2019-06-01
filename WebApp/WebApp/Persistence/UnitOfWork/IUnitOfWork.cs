using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;
using WebApp.Persistence.Repository.AdminRepo;
using WebApp.Persistence.Repository.DepartureRepo;
using WebApp.Persistence.Repository.LineRepo;
using WebApp.Persistence.Repository.PutnikRepo;
using WebApp.Persistence.Repository.TicketRepo;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IPutnikRepository PutnikServices { get; set; }
        IAdministratorRepository AdministratorServices { get; set; }
        IStationRepository StationServices { get; set; }
        ILineRepository LineServices { get; set; }
        IDepartureRepository DepartureServices { get; set; } 
        ITicketRepository TicketServices { get; set; }
        int Complete();
    }
}
