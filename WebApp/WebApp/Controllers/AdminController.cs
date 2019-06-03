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

		[Route("User/{id}")]
		public IHttpActionResult GetUser(int id)
		{
			var user = unitOfWork.UsersRepository.Find(x => !(x is Administrator) && x.Id == id);
			return user != null ? Ok(user) : (IHttpActionResult)NotFound();
		}

		[HttpPost]
		[Route("CreateConductor")]
		public void CreateConductor(ConductorCreationRequest createdConductor)
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

		[HttpDelete]
		[Route("BlockUser/{id}")]
		public IHttpActionResult BlockUser(int id)
		{
			var user = unitOfWork.UsersRepository.Get(id);
			if (user == null) return NotFound();

			if (!user.Blocked)
			{
				user.Blocked = true;
				unitOfWork.Complete();
			}

			return Ok();
		}

		[HttpGet]
		[Route("UnblockUser/{id}")]
		public IHttpActionResult UnblockUser(int id)
		{
			var user = unitOfWork.UsersRepository.Get(id);
			if (user == null) return NotFound();

			if (user.Blocked)
			{
				user.Blocked = false;
				unitOfWork.Complete();
			}

			return Ok();
		}
	}
}