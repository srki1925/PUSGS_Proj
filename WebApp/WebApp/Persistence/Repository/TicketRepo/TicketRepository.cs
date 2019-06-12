using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepo
{
	public sealed class TicketRepository : Repository<Ticket, int>, ITicketRepository
	{
		private ApplicationDbContext _context;

		public TicketRepository(DbContext context) : base(context)
		{
			_context = context as ApplicationDbContext;
		}

		public List<Ticket> GetTicketsForUser(string userId)
		{
			var query = _context.Tickets.Where(x => x.User_Id == userId);
			if (query.Any())
			{
				return query.Include(x => x.TicketDefinition).ToList();
			}
			return new List<Ticket>();
		}
	}
}