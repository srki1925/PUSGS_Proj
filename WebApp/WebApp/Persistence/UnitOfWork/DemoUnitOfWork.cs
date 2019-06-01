using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Unity;
using WebApp.Persistence.Repository;
using WebApp.Persistence.Repository.AdminRepo;
using WebApp.Persistence.Repository.DepartureRepo;
using WebApp.Persistence.Repository.LineRepo;
using WebApp.Persistence.Repository.PutnikRepo;
using WebApp.Persistence.Repository.StationRepo;
using WebApp.Persistence.Repository.TicketRepo;

namespace WebApp.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
      
        public DemoUnitOfWork(DbContext context)
        {
            _context = context;
        }

        [Dependency]
        public IPutnikRepository PutnikServices { get; set; }
        [Dependency]
        public IAdministratorRepository AdministratorServices { get; set; }
        [Dependency]
        public IStationRepository StationServices { get; set; }
        [Dependency]
        public ILineRepository LineServices { get; set; }
        [Dependency]
        public IDepartureRepository DepartureServices { get; set; }
        [Dependency]
        public ITicketRepository TicketServices { get; set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}