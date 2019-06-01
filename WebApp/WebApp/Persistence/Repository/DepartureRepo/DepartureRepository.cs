using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.DepartureRepo
{
	public sealed class DepartureRepository : Repository<Departure, int>, IDepartureRepository
	{
		public DepartureRepository(DbContext context) : base(context)
		{
		}
	}
}