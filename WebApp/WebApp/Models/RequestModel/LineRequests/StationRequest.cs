namespace WebApp.Models.RequestModel.LineRequests
{
	public class StationRequest
	{
		public int LineId { get; set; }
		public int StationId { get; set; }
		public long LineVersion { get; set; }
		public long StationVersion { get; set; }
	}
}