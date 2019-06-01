using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	//cenovnik moze da ima  0 * stavki i stavka moze da pripada  0 * cenovnika mada ovo ne razumem zasto pa cu pitati sutra
	public class PriceList_PriceListItem
	{
		public PriceList_PriceListItem()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Cenovnik")]
		public int? Cenovnik_Id { get; set; }

		public PriceList Cenovnik { get; set; }

		[ForeignKey("Stavka")]
		public int? Stavka_Id { get; set; }

		public PriceListItem Stavka { get; set; }
	}
}