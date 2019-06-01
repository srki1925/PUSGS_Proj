using System;

namespace WebApp.Models.Finances.Ticket_Definitions
{
	public sealed class HourTicketDefinition : TicketDefinition
	{
		public HourTicketDefinition() : base(TicketType.Hour)
		{
		}

		public override bool CheckTicketValidity(DateTime issueDate)
		{
			return DateTime.Now <= issueDate.AddHours(1);
		}
	}
}