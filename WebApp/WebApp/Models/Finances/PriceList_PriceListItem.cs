using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public class PriceList_PriceListItem
	{
		public PriceList_PriceListItem()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("PriceList")]
		public int? PriceListID { get; set; }

		public PriceList PriceList { get; set; }

		[ForeignKey("PriceListItem")]
		public int? PriceListItemID { get; set; }

		public PriceListItem PriceListItem { get; set; }
	}
}