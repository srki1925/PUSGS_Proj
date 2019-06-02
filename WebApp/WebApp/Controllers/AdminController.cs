using System.Web.Http;
using WebApp.Models.RequestModel;
using WebApp.Models.Users;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/Admin")]
	public class AdminController : ApiController
	{
		private readonly IUnitOfWork unitOfWork;

		public AdminController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[Route("Users")]
		public IHttpActionResult GetUsers()
		{
			return Ok(unitOfWork.UsersRepository.Find(x => !(x is Administrator)));
		}

		[HttpPost]
		[Route("CreateConductor")]
		public void CreateConductor([FromBody]ConductorCreationRequest createdConductor)
		{
			unitOfWork.ConductorRepository.Add(new Conductor
			{
				Email = createdConductor.Email,
				FirstName = createdConductor.FirstName,
				LastName = createdConductor.LastName,
				Password = createdConductor.Password,
			});
			unitOfWork.Complete();
		}

		// PUT api/<controller>/5
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/<controller>/5
		public void Delete(int id)
		{
		}
	}
}