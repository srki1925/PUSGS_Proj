using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public class PriceList
	{
		public PriceList()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public DateTime VaziOd { get; set; }
		public DateTime VaziDo { get; set; }

		public bool Active { get; set; }
	}
}