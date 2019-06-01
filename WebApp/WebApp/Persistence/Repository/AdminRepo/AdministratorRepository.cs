using System.Data.Entity;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.AdminRepo
{
	public sealed class AdministratorRepository : Repository<Administrator, int>, IAdministratorRepository
	{
		public AdministratorRepository(DbContext context) : base(context)
		{
		}
	}
}