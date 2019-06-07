using System;
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
        [ForeignKey("User")]
        public int User_Id { get; set; }

        public User User { get; set; }

		public DateTime IssueDate { get; set; }

		public string Email { get; set; }

		[NotMapped]
		public bool Valid => TicketDefinition.CheckTicketValidity(IssueDate);
	}
}