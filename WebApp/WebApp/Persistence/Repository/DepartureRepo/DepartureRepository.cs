using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApp.Models;

namespace WebApp.Persistence.Repository.DepartureRepo
{
	public sealed class DepartureRepository : Repository<Departure, int>, IDepartureRepository
	{

        private ApplicationDbContext context;
		public DepartureRepository(DbContext context) : base(context)
		{
            this.context = context as ApplicationDbContext;
		}
        public List<Departure> GetAllDep()
        {
            return context.Departures.Include(t=>t.Line).ToList();
        }
    }
}