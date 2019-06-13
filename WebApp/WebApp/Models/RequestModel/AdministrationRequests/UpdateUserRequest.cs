using System.ComponentModel.DataAnnotations;

namespace WebApp.Models.RequestModel.AdministrationRequests
{
	public class UpdateUserRequest
	{
		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		public string EncodedImage { get; set; }
	}
}