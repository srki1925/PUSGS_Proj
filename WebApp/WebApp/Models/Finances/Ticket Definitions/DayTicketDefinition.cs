using System;

namespace WebApp.Models.Finances.Ticket_Definitions
{
	public sealed class DayTicketDefinition : TicketDefinition
	{
		public DayTicketDefinition() : base(TicketType.Day)
		{
		}

		public override bool CheckTicketValidity(DateTime issueDate)
		{
			var now = DateTime.Now;
			return issueDate.Year == now.Year && issueDate.Month == now.Month && issueDate.Day == now.Day;
		}
	}
}