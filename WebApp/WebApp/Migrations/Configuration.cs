namespace WebApp.Migrations
{
	using System.Data.Entity.Migrations;
	using System.Linq;
	using Microsoft.AspNet.Identity;
	using Microsoft.AspNet.Identity.EntityFramework;
	using WebApp.Models;
	using WebApp.Models.Users;

	internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = true;
			AutomaticMigrationDataLossAllowed = true;
		}

		protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
		{
			// This method will be called after migrating to the latest version.

			// You can use the DbSet<T>.AddOrUpdate() helper extension method to avoid creating
			// duplicate seed data.

			if (!context.Roles.Any(r => r.Name == "Admin"))
			{
				var store = new RoleStore<IdentityRole>(context);
				var manager = new RoleManager<IdentityRole>(store);
				var role = new IdentityRole { Name = "Admin" };

				manager.Create(role);
			}

			if (!context.Roles.Any(r => r.Name == "Controller"))
			{
				var store = new RoleStore<IdentityRole>(context);
				var manager = new RoleManager<IdentityRole>(store);
				var role = new IdentityRole { Name = "Controller" };

				manager.Create(role);
			}

			if (!context.Roles.Any(r => r.Name == "Passenger"))
			{
				var store = new RoleStore<IdentityRole>(context);
				var manager = new RoleManager<IdentityRole>(store);
				var role = new IdentityRole { Name = "Passenger" };

				manager.Create(role);
			}

			var userStore = new UserStore<ApplicationUser>(context);
			var userManager = new UserManager<ApplicationUser>(userStore);

			if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
			{
				var user = new Administrator() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
				userManager.Create(user);
				userManager.AddToRole(user.Id, "Admin");
			}

			if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
			{
				var user = new Administrator() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!") };
				userManager.Create(user);
				userManager.AddToRole(user.Id, "Passenger");
			}
		}
	}
}