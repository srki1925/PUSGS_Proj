using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.PriceListItemRepo
{
	public interface IPriceListItemRepository : IRepository<PriceListItem, int>
	{
        List<PriceListItem> GetPriceListItems(Expression<Func<PriceListItem, bool>> predicate);
        PriceListItem GetItem(Expression<Func<PriceListItem, bool>> predicate);
	}
}