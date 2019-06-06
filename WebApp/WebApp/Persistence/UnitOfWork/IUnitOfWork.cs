using System;
using WebApp.Persistence.Repository;
using WebApp.Persistence.Repository.AdminRepo;
using WebApp.Persistence.Repository.BusRepo;
using WebApp.Persistence.Repository.DepartureRepo;
using WebApp.Persistence.Repository.LineRepo;
using WebApp.Persistence.Repository.PriceListItemRepo;
using WebApp.Persistence.Repository.PriceListRepo;
using WebApp.Persistence.Repository.PutnikRepo;
using WebApp.Persistence.Repository.StationRepo;
using WebApp.Persistence.Repository.TicketRepo;
using WebApp.Persistence.Repository.UsersRepository;

namespace WebApp.Persistence.UnitOfWork
{
	public interface IUnitOfWork : IDisposable
	{
		IPassengerRepository PassengerServices { get; }
		IAdministratorRepository AdministratorServices { get; }
		IBusStationRepository StationServices { get; }
		ILineRepository LineServices { get; }
		IDepartureRepository DepartureServices { get; }
		ITicketRepository TicketServices { get; }
		IBusRepository BusServices { get; }
		IPriceListRepository PriceListServices { get; }
		IPriceListItemRepository PriceListItemServices { get; }
		IConductorRepository ConductorRepository { get; }
		IUserRepository UsersRepository { get; }

		int Complete();
	}
}