using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.PriceListRepo
{
	public sealed class PriceListRepository : Repository<PriceList, int>, IPriceListRepository
	{
        private ApplicationDbContext _context;
		public PriceListRepository(DbContext context) : base(context)
		{
            _context = context as ApplicationDbContext;
		}

        public List<PriceList> GetPriceLists(Expression<Func<PriceList, bool>> predicate)
        {
            return _context.PriceLists.Where(predicate).ToList();
        }
    }
}