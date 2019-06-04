using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Models.Enums;

namespace WebApp.Models
{
	public class Departure
	{
		public Departure()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public string Time { get; set; }

		public DayType DayType { get; set; }

		public Line Line { get; set; }

        public bool Active { get; set; } = true;
	}
}