using System.Linq;
using System.Net.Mail;
using System.Web.Http;
using WebApp.Models.RequestModel.PassengerRequest;
using WebApp.Models.Users;
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

		[HttpPost]
		[Route("Accept")]
		[Authorize(Roles = "Controller")]
		public IHttpActionResult Accept([FromBody]ConductorModifyRequest request)
		{
			var users = unitOfWork.UsersRepository.Find(x => x.Email == request.Email);
			if (!users.Any()) return NotFound();

			var user = users.First();
			(user as Passenger).PassengerState = PassengerState.Accepted;
			unitOfWork.Complete();
			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", user.Email, "Your registration was accepted.", "Registration Accepted");
			return Ok();
		}

		[HttpPost]
		[Route("Refuse")]
		[Authorize(Roles = "Controller")]
		public void Refuse([FromBody]ConductorModifyRequest request)
		{
			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", request.Email, "Your registration was denied, try sending us new documentation.", "Registration denied");
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
			mail.From = new MailAddress(emailFrom);
			SmtpServer.Port = 587;
			SmtpServer.Credentials = new System.Net.NetworkCredential(emailFrom, pw);
			SmtpServer.EnableSsl = true;
			SmtpServer.Send(mail);
		}
	}
}