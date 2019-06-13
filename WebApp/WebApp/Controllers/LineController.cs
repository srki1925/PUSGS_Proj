﻿using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.RequestModel.LineRequests;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/Line")]
	public class LineController : ApiController
	{
		private readonly IUnitOfWork unitOfWork;

		public LineController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("CreateLine")]
		[Authorize(Roles = "Admin")]
		public void CreateLine([FromBody]LineCreationRequest line)
		{
			var Line = unitOfWork.LineServices.GetLine(x => x.Active && x.Name == line.Name);
			if (Line == null)
			{
				Line newline = new Line()
				{
					Name = line.Name,
					LineType = line.LineType
				};
				unitOfWork.LineServices.Add(newline);
				unitOfWork.Complete();
			}
		}

		[HttpGet]
		[Route("Lines")]
		public IHttpActionResult GetLines()
		{
			var lines = unitOfWork.LineServices.GetAll();
			return Ok(lines.Where(x => x.Active));
		}

		[HttpPost]
		[Route("AddStation")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult AddStation(StationRequest addStationRequest)
		{
			var line = unitOfWork.LineServices.GetLine(x => x.Id == addStationRequest.LineId && x.Active);
			var station = unitOfWork.StationServices.GetStation(x => x.Id == addStationRequest.StationId && x.Active);
			if (line != null && station != null)
			{
				if (line.Stations == null) line.Stations = new List<BusStation>();
				if (!line.Stations.Contains(station))
				{
					line.Stations.Add(station);
					unitOfWork.Complete();
					return Ok();
				}
				return BadRequest($"Line with id {addStationRequest.LineId} already contains bus station with id {addStationRequest.StationId}");
			}
			else
			{
				return NotFound();
			}
		}

		[HttpPost]
		[Route("RemoveStation")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult RemoveStation(StationRequest stationRequest)
		{
			var line = unitOfWork.LineServices.GetLine(x => x.Id == stationRequest.LineId && x.Active);

			var station = line.Stations.Where(x => x.Id == stationRequest.StationId).First();
			if (line != null && station != null)
			{
				line.Stations.Remove(station);
				unitOfWork.Complete();
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		[HttpPut]
		[Route("Update")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult UpdateLine(LineUpdateRequest lineUpdateRequest)
		{
			var line = unitOfWork.LineServices.GetLine(x => x.Active && x.Id == lineUpdateRequest.Id);
			var check = unitOfWork.LineServices.GetLine(x => x.Active && x.Name == lineUpdateRequest.Name && x.Id != lineUpdateRequest.Id);
			if (line != null && check == null)
			{
				line.Name = lineUpdateRequest.Name;
				line.LineType = lineUpdateRequest.LineType;
				unitOfWork.Complete();
				return Ok();
			}
			else if (line == null)
			{
				return NotFound();
			}
			else
			{
				return BadRequest($"Line with name {lineUpdateRequest.Name} already exist!!!");
			}
		}

		[HttpGet]
		[Route("getline/{id}")]
		public IHttpActionResult GetLine(int id)
		{
			var line = unitOfWork.LineServices.Get(id);
			if (line != null)
			{
				return Ok(line);
			}
			return NotFound();
		}

		[HttpGet]
		[Route("getstations/{id}")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult GetStations(int id)
		{
			var line = unitOfWork.LineServices.GetLine(x => x.Active && x.Id == id);
			if (line != null)
			{
				return Ok(line.Stations);
			}
			return Ok(new List<BusStation>(0));
		}

		[HttpDelete]
		[Route("RemoveLine/{id}")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult RemoveLine(int id)
		{
			var line = unitOfWork.LineServices.GetLine(x => x.Active && x.Id == id);
			if (line != null)
			{
				line.Active = false;
				line.Stations.Clear();
				unitOfWork.Complete();
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}
	}
}