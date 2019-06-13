using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.Enums;
using WebApp.Models.RequestModel.ScheduleRequest;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/schedule")]
    public class ScheduleController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public ScheduleController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("lines/{lineType}")]
        public IHttpActionResult GetLinesType(int lineType)
        {

            var lines = unitOfWork.LineServices.GetLines(x => x.LineType == (LineType)lineType && x.Active);
            if(lines != null)
            {
                return Ok(lines);
            }
            return Ok( new List<Line>(0));

        }

        [HttpPost]
        [Route("departures")]
        public IHttpActionResult GetDepartures(ScheduleRequestModel scheduleRequestModel)
        {
            var deparutes = unitOfWork.DepartureServices.GetDepartures(x => x.Active && x.DayType == scheduleRequestModel.DayType && x.LineId == scheduleRequestModel.LineId);
            if(deparutes != null)
            {
                return Ok(deparutes);
            }
            return Ok(new List<Departure>(0));
        }
    }
}
