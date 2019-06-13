using System.Collections.Generic;

namespace WebApp.Models.RequestModel.PriceListRequest
{
	public class PriceListUpdateRequest
	{
		public int Id { get; set; }
		public List<int> PriceListItems { get; set; }
		public long Version { get; set; }
	}
}