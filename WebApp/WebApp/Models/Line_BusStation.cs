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

		[ForeignKey("Linija")]
		public int? Linija_Id { get; set; }

		public Line Linija { get; set; }

		[ForeignKey("Stanica")]
		public int? Stanica_Id { get; set; }

		public BusStation Stanica { get; set; }
	}
}