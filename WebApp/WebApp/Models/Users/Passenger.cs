using WebApp.Models.Enums;

namespace WebApp.Models.Users
{
	public sealed class Passenger : User
	{
		public Passenger()
		{
			UserType = UserType.Passenger;
		}

		public PassengerType PassengerType { get; set; }

        public string ImageUri { get; set; }
	}
}