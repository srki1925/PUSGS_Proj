using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.PriceListItemRepo
{
	public sealed class PriceListItemRepository : Repository<PriceListItem, int>, IPriceListItemRepository
	{
		public PriceListItemRepository(DbContext context) : base(context)
		{
		}
	}
}