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

		public PriceList GetPriceList(Expression<Func<PriceList, bool>> predicate)
		{
			if (_context.PriceLists.Any(predicate))
			{
				return _context.PriceLists.Where(predicate).Include(x => x.PriceListItems).Include("PriceListItems.TicketDefinition").First();
			}
			return null;
		}

		public List<PriceList> GetPriceLists(Expression<Func<PriceList, bool>> predicate = null)
		{
			if (predicate == null)
			{
				return _context.PriceLists.Include(x => x.PriceListItems).Include("PriceListItems.TicketDefinition").ToList();
			}

			if (_context.PriceLists.Any(predicate))
			{
				return _context.PriceLists.Where(predicate).Include(x => x.PriceListItems).Include("PriceListItems.TicketDefinition").ToList();
			}

			return null;
		}
	}
}