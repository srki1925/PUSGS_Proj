using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Models.Users;

namespace WebApp.Models
{
	public class Ticket
	{
		public Ticket()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public TicketDefinition TicketDefinition { get; set; }

		public User Korisnik { get; set; }

		public bool Active { get; set; }

		public string Email { get; set; }
	}
}