using System.ComponentModel.DataAnnotations;

namespace WebApp.Models.RequestModel.TicketRequestModel
{
	public class TicketRequestModel
	{
		[DataType(DataType.EmailAddress)]
		[Required]
		public string Email { get; set; }

		[Required]
		public int TicketDefinitionId { get; set; }
	}
}