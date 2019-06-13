using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
	public class VersionedItem
	{
		public long VersionId { get; set; }

		[Timestamp]
		public byte[] RowVersion { get; set; }
	}
}