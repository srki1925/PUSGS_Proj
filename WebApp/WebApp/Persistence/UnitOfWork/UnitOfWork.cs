using System.Data.Entity;
using Unity;
using WebApp.Persistence.Repository.AdminRepo;
using WebApp.Persistence.Repository.BusRepo;
using WebApp.Persistence.Repository.DepartureRepo;
using WebApp.Persistence.Repository.LineRepo;
using WebApp.Persistence.Repository.PriceListItemRepo;
using WebApp.Persistence.Repository.PriceListRepo;
using WebApp.Persistence.Repository.PutnikRepo;
using WebApp.Persistence.Repository.StationRepo;
using WebApp.Persistence.Repository.TicketRepo;

namespace WebApp.Persistence.UnitOfWork
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly DbContext _context;

		public UnitOfWork(DbContext context)
		{
			_context = context;
		}

		[Dependency]
		public IPassengerRepository PutnikServices { get; set; }

		[Dependency]
		public IAdministratorRepository AdministratorServices { get; set; }

		[Dependency]
		public IBusStationRepository StationServices { get; set; }

		[Dependency]
		public ILineRepository LineServices { get; set; }

		[Dependency]
		public IDepartureRepository DepartureServices { get; set; }

		[Dependency]
		public ITicketRepository TicketServices { get; set; }

		[Dependency]
		public IBusRepository BusServices { get; set; }

		[Dependency]
		public IPriceListRepository PriceListServices { get; set; }

		[Dependency]
		public IPriceListItemRepository PriceListItemServices { get; set; }

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