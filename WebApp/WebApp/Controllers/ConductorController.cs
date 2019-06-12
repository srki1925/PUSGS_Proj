using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity.Owin;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/Conductor")]
	public class ConductorController : ApiController
	{
		private readonly IUnitOfWork unitOfWork;

		public ConductorController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpDelete]
		[Route("Accept/{id}")]
		[Authorize(Roles = "Admin")]
		public void Accept(string id)
		{
			var user = unitOfWork.UsersRepository.Find(x => x.Id == id).First();
			user.Blocked = false;

			// After user is accepted add him to role
			Request.GetOwinContext().GetUserManager<ApplicationUserManager>()
				.AddToRoleAsync(user.Id, user.UserType.ToString());

			unitOfWork.Complete();

			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", user.Email, "Your registration was accepted", "registration");
		}

		[HttpPost]
		[Route("Refuse")]
		[Authorize(Roles = "Controller")]
		public void Refuse(string email)
		{
			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", email, "Your registration was denied", "registration");
		}

		[HttpGet]
		[Route("validate/{id}")]
		[Authorize(Roles = "Controller")]
		public IHttpActionResult Validate(int id)
		{
			var ticket = unitOfWork.TicketServices.GetTicketWithDefinition(id);
			if (ticket != null)
			{
				var msg = ticket.Valid ? "Valid" : "Not Valid";
				return Ok(msg);
			}
			return NotFound();
		}

		private void SendMail(string emailFrom, string pw, string emailTo, string body, string subject)
		{
			MailMessage mail = new MailMessage();
			SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
			mail.To.Add(emailTo);
			mail.Subject = subject;
			mail.Body = body;
			mail.From = new MailAddress("titovrentavehicle@gmail.com");
			SmtpServer.Port = 587;
			SmtpServer.Credentials = new System.Net.NetworkCredential("titovrentavehicle@gmail.com", "drugtito");
			SmtpServer.EnableSsl = true;
			SmtpServer.Send(mail);
		}
	}
}