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

		public int Name { get; set; }

		[NotMapped]
		public string Longitude { get; set; }

		[NotMapped]
		public string Latitude { get; set; }
        [ForeignKey("Line")]
        public int Line_Id { get; set; }

        public Line Line { get; set; }

		public bool Active { get; set; }
	}
}