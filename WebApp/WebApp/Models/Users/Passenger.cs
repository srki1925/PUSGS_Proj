using System.Collections.Generic;
using WebApp.Models.Enums;

namespace WebApp.Models.Users
{
	public enum PassengerState
	{
		Waiting = 0,
		Accepted = 1,
		Blocked
	}

	public sealed class Passenger : User
	{
		public Passenger()
		{
			UserType = UserType.Passenger;
		}

		public PassengerType PassengerType { get; set; }

		public PassengerState PassengerState { get; set; }

		public List<Ticket> Tickets { get; set; }

		public bool Activated { get; set; } = false;

		public string ImageUri { get; set; }
	}
}