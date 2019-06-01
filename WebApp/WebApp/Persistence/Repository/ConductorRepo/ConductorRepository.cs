using System.Data.Entity;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository
{
	public sealed class ConductorRepository : Repository<Conductor, int>, IConductorRepository
	{
		public ConductorRepository(DbContext context) : base(context)
		{
		}
	}
}