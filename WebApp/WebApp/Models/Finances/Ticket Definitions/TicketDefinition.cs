using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public enum TicketType
	{
		/// <summary>
		/// Indicates that ticket is valid only for one hour.
		/// </summary>
		Hour,

		/// <summary>
		/// Indicates that ticket is valid for one day.
		/// </summary>
		Day,

		/// <summary>
		/// Indicates that ticket is valid for one month.
		/// </summary>
		Month,

		/// <summary>
		/// Indicates that ticket is valid for one year.
		/// </summary>
		Year
	}

	public abstract class TicketDefinition
	{
		/// <summary>
		/// To be used only by ORM.
		/// </summary>
		public TicketDefinition()
		{
		}

		/// <summary>
		/// Initializes a new instance of <see cref="TicketDefinition" /> of specified <see
		/// cref="WebApp.Models.TicketType" />.
		/// </summary>
		/// <param name="ticketType"></param>
		public TicketDefinition(TicketType ticketType)
		{
			TicketType = ticketType;
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public decimal Price { get; set; }

		/// <summary>
		/// Type of ticket definition.
		/// </summary>
		/// <remarks>
		/// Since ticket definition is abstract, desciminator will be generated in table for each
		/// concrete class, but this enum is used for faster processing.
		/// </remarks>
		public TicketType TicketType { get; set; }

		public abstract bool CheckTicketValidity(DateTime issueDate);
	}
}