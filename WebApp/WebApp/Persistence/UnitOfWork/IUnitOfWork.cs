using System;
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
	public interface IUnitOfWork : IDisposable
	{
		IPassengerRepository PutnikServices { get; set; }
		IAdministratorRepository AdministratorServices { get; set; }
		IBusStationRepository StationServices { get; set; }
		ILineRepository LineServices { get; set; }
		IDepartureRepository DepartureServices { get; set; }
		ITicketRepository TicketServices { get; set; }
		IBusRepository BusServices { get; set; }
		IPriceListRepository PriceListServices { get; set; }
		IPriceListItemRepository PriceListItemServices { get; set; }

		int Complete();
	}
}