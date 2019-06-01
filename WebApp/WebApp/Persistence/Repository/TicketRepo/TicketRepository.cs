using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepo
{
	public sealed class TicketRepository : Repository<Ticket, int>, ITicketRepository
	{
		public TicketRepository(DbContext context) : base(context)
		{
		}
	}
}