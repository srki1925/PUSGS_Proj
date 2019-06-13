using WebApp.Models.Users;

namespace WebApp.Models.ResponseModel
{
	public class UserDetailsResponse
	{
		public UserDetailsResponse(User user)
		{
			FirstName = user.FirstName;
			LastName = user.LastName;
			UserType = user.UserType.ToString();

			var passenger = user as Passenger;
			if (passenger != null)
			{
				PassengerType = passenger.PassengerType.ToString();
				if (passenger.PassengerType != Enums.PassengerType.Regular)
				{
					EncodedImage = passenger.ImageUri;
				}
			}
		}

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string UserType { get; set; }

		public string PassengerType { get; set; }

		public string EncodedImage { get; set; }
	}
}