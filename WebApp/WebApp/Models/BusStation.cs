using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public class BusStation
	{
		public BusStation()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public string Naziv { get; set; }
		public string Adresa { get; set; }
		public string Longitude { get; set; }
		public string Latitude { get; set; }
		public bool Active { get; set; }
	}
}