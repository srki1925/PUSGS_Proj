using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.PutnikRepo
{
	public interface IPassengerRepository : IRepository<Passenger, int>
	{
		void UpdatePhoto(int id, string imageUri);
	}
}