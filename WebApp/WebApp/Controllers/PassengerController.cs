using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApp.Models.ResponseModel;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/Passenger")]
	public class PassengerController : ApiController
	{
		private readonly IUnitOfWork unitOfWork;

		public PassengerController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpGet]
		[Route("ActivationList")]
		[Authorize(Roles = "Controller")]
		public IHttpActionResult ActivationList()
		{
			var response = unitOfWork.PassengerServices.Find(x => x.PassengerState == Models.Users.PassengerState.Waiting);
			if (response.Any())
			{
				return Ok(response.Select(x => new ActivationListItemResponse(x)));
			}

			return Ok(new List<ActivationListItemResponse>(0));
		}
	}
}