using System.Data.Entity;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.UsersRepository
{
	public class UserRepository : Repository<User, int>, IUserRepository
	{
		public UserRepository(DbContext context) : base(context)
		{
		}
	}
}