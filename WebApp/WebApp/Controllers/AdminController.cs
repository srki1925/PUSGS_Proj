using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
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
		[Authorize(Roles = "Admin")]
		public IHttpActionResult GetUsers()
		{
			var users = unitOfWork.UsersRepository.Find(x => !(x is Administrator));
			if (users.Any())
			{
				return Ok(users.ToList());
			}
			return Ok(new List<User>());
		}

		[Route("User/{id}")]
		public IHttpActionResult GetUser(string id)
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
				PasswordHash = createdConductor.Password,
			});

			unitOfWork.Complete();
			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", createdConductor.Email, $"Your password for account is {createdConductor.Password}", "New Account");
		}

		[HttpDelete]
		[Route("BlockUser/{id}")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult BlockUser(string id)
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

		[HttpDelete]
		[Route("UnblockUser/{id}")]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult UnblockUser(string id)
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

		private void SendMail(string emailFrom, string pw, string emailTo, string body, string subject)
		{
			MailMessage mail = new MailMessage();
			SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
			mail.To.Add(emailTo);
			mail.Subject = subject;
			mail.Body = body;
			mail.From = new MailAddress(emailFrom);
			SmtpServer.Port = 587;
			SmtpServer.Credentials = new System.Net.NetworkCredential(emailFrom, pw);
			SmtpServer.EnableSsl = true;
			SmtpServer.Send(mail);
		}
	}
}