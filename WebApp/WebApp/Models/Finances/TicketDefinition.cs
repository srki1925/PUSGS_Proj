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

	public class TicketDefinition
	{
		/// <summary>
		/// Empty constructor used for, to be used by ORM for serialization porposes.
		/// </summary>
		public TicketDefinition()
		{
		}

		/// <summary>
		/// Initializes new instance of <see cref="TicketDefinition" /> class.
		/// </summary>
		/// <param name="type">Type of ticket to instanciate.</param>
		public TicketDefinition(TicketType type)
		{
			TicketType = type;

			switch (TicketType)
			{
				case TicketType.Hour:
					ValidTo.AddHours(1);
					break;

				case TicketType.Day:
					ValidTo = ValidFrom.AddRoundedDay();
					break;

				case TicketType.Month:
					ValidTo = ValidFrom.AddRoundedMonth();
					break;

				case TicketType.Year:
					ValidTo = ValidFrom.AddRoundedYear();
					break;

				default:
					break;
			}
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public DateTime ValidFrom { get; set; } = DateTime.Now;

		public DateTime ValidTo { get; set; }

		public decimal Price { get; set; }

		public TicketType TicketType { get; set; }
	}
}