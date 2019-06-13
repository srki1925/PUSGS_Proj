using WebApp.Models.Users;

namespace WebApp.Models.ResponseModel
{
	public class ActivationListItemResponse
	{
		public ActivationListItemResponse(Passenger passenger)
		{
			Email = passenger.Email;
			EncodedImage = passenger.ImageUri;
			DoB = passenger.DoB.ToShortDateString();
			PassengerType = passenger.PassengerType.ToString();
			FirstName = passenger.FirstName;
			LastName = passenger.LastName;
		}

		public string Email { get; set; }

		public string EncodedImage { get; set; }

		public string DoB { get; set; }

		public string PassengerType { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }
	}
}