using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models.RequestModel
{
	public sealed class ConductorCreationRequest
	{
		public string FirstName { get; set; }

		public string LastName { get; set; }

		[EmailAddress]
		public string Email { get; set; }
        public DateTime DoB { get; set; }

        public string Password { get; set; }
	}
}