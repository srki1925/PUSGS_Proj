using System;
using WebApp.Models.Enums;

namespace WebApp.Models.Users
{
	public abstract class User : ApplicationUser
	{
		public User()
		{
		}

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public DateTime DoB { get; set; }

		public UserType UserType { get; set; }

		public bool Blocked { get; set; }
	}
}