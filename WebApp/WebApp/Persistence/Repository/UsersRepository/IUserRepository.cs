using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.UsersRepository
{
	public interface IUserRepository : IRepository<User, int>
	{
	}
}