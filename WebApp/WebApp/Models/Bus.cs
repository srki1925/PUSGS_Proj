using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public class Bus
	{
		public Bus()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public int Naziv { get; set; }
		public string Longitude { get; set; }
		public string Latitude { get; set; }

		[ForeignKey("Linija")]
		public int? Linija_Id { get; set; }

		public Line Linija { get; set; }
		public bool Active { get; set; }
	}
}