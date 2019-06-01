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
			return DateTime.Now.Ticks == (issueDate.Ticks - (issueDate.Ticks % TimeSpan.TicksPerDay));
		}
	}
}