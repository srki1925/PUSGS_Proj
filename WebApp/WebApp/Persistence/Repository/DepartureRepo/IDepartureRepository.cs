using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository.DepartureRepo
{
	public interface IDepartureRepository : IRepository<Departure, int>
	{
         List<Departure> GetAllDep();
	}
}