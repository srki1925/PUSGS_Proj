using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.PriceListRepo
{
	public interface IPriceListRepository : IRepository<PriceList, int>
	{
        List<PriceList> GetPriceLists(Expression<Func<PriceList, bool>> predicate);
	}
}