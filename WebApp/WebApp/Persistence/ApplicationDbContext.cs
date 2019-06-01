using Microsoft.AspNet.Identity.EntityFramework;
using WebApp.Models;
using WebApp.Models.Users;

namespace WebApp.Persistence
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		public ApplicationDbContext()
			: base("DefaultConnection", throwIfV1Schema: false)
		{
		}

        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<Kontrolor> Conductors { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<BusStation> BusStations { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<PriceList> PriceLists { get; set; }
        public DbSet<PriceListItem> PriceListItems { get; set; }


    }
}