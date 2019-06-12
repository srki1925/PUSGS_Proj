using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketDefinitionRepo
{
	public class TicketDefinitionRepository : Repository<TicketDefinition, int>, ITicketDefinitionRepository
	{
		private ApplicationDbContext _context;

		public TicketDefinitionRepository(DbContext context) : base(context)
		{
			_context = context as ApplicationDbContext;
		}
	}
}