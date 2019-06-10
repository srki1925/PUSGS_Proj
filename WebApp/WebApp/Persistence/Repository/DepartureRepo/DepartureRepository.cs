using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApp.Models;

namespace WebApp.Persistence.Repository.DepartureRepo
{
	public sealed class DepartureRepository : Repository<Departure, int>, IDepartureRepository
	{

        private ApplicationDbContext _context;
		public DepartureRepository(DbContext context) : base(context)
		{
            this._context = context as ApplicationDbContext;
		}
        public List<Departure> GetAllDep()
        {
            var response = _context.Departures.Include(t => t.Line).ToList();
            return response.Where(x => x.Active).ToList();
        }
    }
}