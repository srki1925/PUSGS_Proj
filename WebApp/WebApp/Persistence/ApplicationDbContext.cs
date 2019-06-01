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

		public static ApplicationDbContext Create()
		{
			return new ApplicationDbContext();
		}

		public System.Data.Entity.DbSet<Passenger> Putniks { get; set; }

		public System.Data.Entity.DbSet<WebApp.Models.Users.Administrator> Administrators { get; set; }
	}
}