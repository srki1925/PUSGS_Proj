using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.RequestModel.BusStationRequest;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/BusStation")]
	public class BusStationController : ApiController
	{
		private readonly IUnitOfWork unitOfWork;

		public BusStationController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("CreateBusStation")]
		[Authorize(Roles = "Admin")]
		public void CreateBusStation(BusStationCreationRequest busStationCreationRequest)
		{
			BusStation busStation = new BusStation()
			{
				Name = busStationCreationRequest.Name,
				Address = busStationCreationRequest.Address,
				Longitude = busStationCreationRequest.Longitude,
				Latitude = busStationCreationRequest.Latitude
			};
			busStation.Lines = new List<Line>();
			unitOfWork.StationServices.Add(busStation);
			unitOfWork.Complete();
		}

		[HttpGet]
		[Route("BusStations")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult GetBusStations()
		{
			var response = unitOfWork.StationServices.GetAll();
			return Ok(response.Where(x => x.Active));
		}

		[HttpGet]
		[Route("BusStations/{id}")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult GetStations(int id)
		{
			var lineStations = unitOfWork.LineServices.GetLine(x => x.Active && x.Id == id).Stations.ConvertAll(x => x.Station);
			var stations = unitOfWork.StationServices.GetStations(x => x.Active);
			var ret = stations.Where(x => lineStations.Find(y => y.Id == x.Id) == null);
			return Ok(ret);
		}

		[HttpDelete]
		[Route("RemoveBusStation/{id}")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult RemoveBusStation(int id)
		{
			var busStation = unitOfWork.StationServices.GetStation(x => x.Active && x.Id == id);
			if (busStation != null)
			{
				busStation.Active = false;
				busStation.Lines.Clear();
				unitOfWork.Complete();
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		[HttpGet]
		[Route("GetLines/{id}")]
		public IHttpActionResult GetLines(int id)
		{
			var bus = unitOfWork.StationServices.GetStation(x => x.Active && x.Id == id);
			var lines = unitOfWork.LineServices.GetLines(x => true).FindAll(x => x.Stations.FindIndex(y => y.Station == bus) != -1);
			if (lines?.Count > 0)
			{
				return Ok(lines);
			}
			return Ok(new List<BusStation>(0));
		}
	}
}