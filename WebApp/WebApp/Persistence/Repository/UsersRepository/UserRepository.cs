using System.Data.Entity;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.UsersRepository
{
	public class UserRepository : Repository<User, string>, IUserRepository
	{
		public UserRepository(DbContext context) : base(context)
		{
		}

		public bool Exist(string email)
		{
			var user = Find(x => x.Email == email) as User;
			return user != null;
		}
	}
}