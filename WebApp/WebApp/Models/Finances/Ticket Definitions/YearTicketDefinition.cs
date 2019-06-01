using System;

namespace WebApp.Models.Finances.Ticket_Definitions
{
	public sealed class YearTicketDefinition : TicketDefinition
	{
		public YearTicketDefinition() : base(TicketType.Year)
		{
		}

		public override bool CheckTicketValidity(DateTime issueDate)
		{
			return DateTime.Now.Year == issueDate.Year;
		}
	}
}