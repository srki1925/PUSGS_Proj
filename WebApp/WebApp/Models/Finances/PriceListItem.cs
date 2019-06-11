using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	//cenovnik se sastoji od stavki
	public class PriceListItem
	{
		public PriceListItem()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
        [ForeignKey("TicketDefinition")]
        public int TicketDefinition_Id { get; set; }
        public TicketDefinition TicketDefinition { get; set; }


		public List<PriceList> PrileLists { get; set; }

		public bool Active { get; set; }
	}
}