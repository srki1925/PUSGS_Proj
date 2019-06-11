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
			Line newline = new Line()
			{
				Name = line.Name,
				LineType = line.LineType
			};
			unitOfWork.LineServices.Add(newline);
			unitOfWork.Complete();
		}

		[HttpGet]
		[Route("Lines")]
		public IHttpActionResult GetLines()
		{
			var lines = unitOfWork.LineServices.GetAll();
			return Ok(lines.Where(x => x.Active));
		}

		[HttpDelete]
		[Route("RemoveLine/{id}")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult RemoveLine(int id)
		{
			var line = unitOfWork.LineServices.Get(id);
			if (line != null)
			{
				line.Active = false;
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