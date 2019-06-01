using System.Data.Entity;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.PutnikRepo
{
	public sealed class PassengerRepository : Repository<Passenger, int>, IPassengerRepository
	{
		public PassengerRepository(DbContext context) : base(context)
		{
		}

		public void UpdatePhoto(int id, string imageUri)
		{
			// Da li ima potrebe da ti repo drzi logiku za update fotke kad se svodi na R -> U operacije?
			var passsenger = Get(id);
			passsenger.ImageUri = imageUri;
			Update(passsenger);
		}
	}
}