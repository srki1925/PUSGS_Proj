using System;

namespace WebApp.Models.Finances.Ticket_Definitions
{
	public sealed class MonthTicketDefinition : TicketDefinition
	{
		public MonthTicketDefinition() : base(TicketType.Month)
		{
		}

		public override bool CheckTicketValidity(DateTime issueDate)
		{
			var currentTime = DateTime.Now;
			return currentTime.Month == issueDate.Month && currentTime.Year == issueDate.Year;
		}
	}
}