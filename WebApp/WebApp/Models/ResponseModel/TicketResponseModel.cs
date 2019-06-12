using System;

namespace WebApp.Models.ResponseModel
{
	public class TicketResponseModel
	{
		public TicketResponseModel(Ticket ticket)
		{
			Id = ticket.Id;
			TicketType = ticket.TicketDefinition.TicketType.ToString();
			IssueDate = ticket.IssueDate;
		}

		public int Id { get; set; }

		public string TicketType { get; set; }

		public DateTime IssueDate { get; set; }
	}
}