using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public class Line_BusStation
	{
		public Line_BusStation()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Line")]
		public int? LineID { get; set; }

		public Line Line { get; set; }

		[ForeignKey("Station")]
		public int? StationID { get; set; }

		public BusStation Station { get; set; }
	}
}