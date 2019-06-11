using System.Linq;
using System.Web.Http;
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
			var response = unitOfWork.PassengerServices.GetAll();
			return Ok(response.Where(x => !x.Blocked));
		}
	}
}