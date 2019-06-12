using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.StationRepo
{
	public sealed class BusStationRepository : Repository<BusStation, int>, IBusStationRepository
	{
        private ApplicationDbContext _context;
		public BusStationRepository(DbContext context) : base(context)
		{
            _context = context as ApplicationDbContext;
		}

        public BusStation GetStation(Expression<Func<BusStation, bool>> predicate)
        {
            if (_context.BusStations.Any(predicate))
            {
            return _context.BusStations.Where(predicate).First() as BusStation;

            }
            return null;
        }

        public List<BusStation> GetStations(Expression<Func<BusStation, bool>> predicate)
        {
            if (_context.BusStations.Include(x => x.Lines).Any(predicate))
            {
                return _context.BusStations.Where(predicate).Include(x => x.Lines).ToList();
            }
            return null;
        }
    }
}