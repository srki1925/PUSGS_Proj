using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.RequestModel.DepartureRequest;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Departure")]
    public class DepartureController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public DepartureController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("CreateDeparture")]
        public void CreateDeparture(DepartureCreationRequest departureCreationRequest)
        {
            Departure departure = new Departure()
            {
                DayType = departureCreationRequest.DayType,
                Time = departureCreationRequest.Time,
                Line = unitOfWork.LineServices.Get(departureCreationRequest.LineId)
            };
            unitOfWork.DepartureServices.Add(departure);
            unitOfWork.Complete();
        }

        [HttpGet]
        [Route("Departures")]
        public IHttpActionResult GetDeparture()
        {
            var dep = unitOfWork.DepartureServices.GetAllDep();
            var response = new List<DepartureResponse>();
            foreach (var item in dep)
            {
               // response.Add(new DepartureResponse() { Id = item.Id, DayType = item.DayType, LineType = item.Line.LineType, Name = item.Line.Name, Time = item.Time });
            }
            return Ok(dep);
        }

        [HttpDelete]
        [Route("RemoveDeparture/{id}")]
        public IHttpActionResult RemoveDeparture(int id)
        {
            var departure = unitOfWork.DepartureServices.Get(id);
            if(departure != null)
            {
                departure.Active = false;
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
