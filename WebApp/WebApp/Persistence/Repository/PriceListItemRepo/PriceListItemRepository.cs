using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.PriceListItemRepo
{
	public sealed class PriceListItemRepository : Repository<PriceListItem, int>, IPriceListItemRepository
	{
        private ApplicationDbContext _context;
		public PriceListItemRepository(DbContext context) : base(context)
		{
            _context = context as ApplicationDbContext;
        }

        public List<PriceListItem> GetPriceListItems(Expression<Func<PriceListItem, bool>> predicate)
        {
          
            return null;
        }
    }
}