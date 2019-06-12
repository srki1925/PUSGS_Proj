using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.StationRepo
{
	public interface IBusStationRepository : IRepository<BusStation, int>
	{
        List<BusStation> GetStations(Expression<Func<BusStation, bool>> predicate);
        BusStation GetStation(Expression<Func<BusStation, bool>> predicate);
    }
}