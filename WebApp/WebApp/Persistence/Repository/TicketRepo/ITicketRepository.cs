using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepo
{
	public interface ITicketRepository : IRepository<Ticket, int>
	{
		List<Ticket> GetTicketsForUser(string userId);

		Ticket GetTicketWithDefinition(int id);
	}
}