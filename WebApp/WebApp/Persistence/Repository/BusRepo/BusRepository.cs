using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.BusRepo
{
	public sealed class BusRepository : Repository<Bus, int>, IBusRepository
	{
		public BusRepository(DbContext context) : base(context)
		{
		}
	}
}