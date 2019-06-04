using System.Collections.Generic;
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

		public string Name { get; set; }

		public string Address { get; set; }

		public string Longitude { get; set; }

		public string Latitude { get; set; }

		public List<Line> Lines { get; set; }

        public bool Active { get; set; } = true;
	}
}