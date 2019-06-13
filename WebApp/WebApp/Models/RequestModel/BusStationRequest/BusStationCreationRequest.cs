namespace WebApp.Models.RequestModel.BusStationRequest
{
	public class BusStationCreationRequest
	{
		public string Name { get; set; }
		public string Address { get; set; }
		public double Longitude { get; set; }
		public double Latitude { get; set; }
	}
}