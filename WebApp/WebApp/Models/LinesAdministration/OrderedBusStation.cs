using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public class OrderedBusStation
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public BusStation Station { get; set; }
	}
}