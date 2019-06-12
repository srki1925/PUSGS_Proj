using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.DepartureRepo
{
	public interface IDepartureRepository : IRepository<Departure, int>
	{
         List<Departure> GetAllDep();
        List<Departure> GetDepartures(Expression<Func<Departure, bool>> predicate);
	}
}