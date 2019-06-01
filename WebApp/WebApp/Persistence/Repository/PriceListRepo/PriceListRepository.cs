using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.PriceListRepo
{
	public sealed class PriceListRepository : Repository<PriceList, int>, IPriceListRepository
	{
		public PriceListRepository(DbContext context) : base(context)
		{
		}
	}
}