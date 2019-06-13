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
			var line = unitOfWork.LineServices.GetLine(x => x.Active && x.Id == id);
			var stations = unitOfWork.StationServices.GetStations(x => x.Active);
			return Ok(stations.Where(x => x.Lines.Find(y => y.Id == id) == null).ToList());
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
			if (bus != null)
			{
				return Ok(bus.Lines);
			}
			return Ok(new List<BusStation>(0));
		}
	}
}