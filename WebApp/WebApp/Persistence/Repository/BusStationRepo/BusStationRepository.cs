using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.StationRepo
{
	public sealed class BusStationRepository : Repository<BusStation, int>, IBusStationRepository
	{
		public BusStationRepository(DbContext context) : base(context)
		{
		}
	}
}