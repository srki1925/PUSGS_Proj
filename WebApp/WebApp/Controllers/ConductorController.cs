using System.Net.Mail;
using System.Web.Http;
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
		public void Accept(int id)
		{
			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", "andrejftniviciak@gmail.com", "Your registration was accepted", "registration");
			var passenger = unitOfWork.PassengerServices.Get(id);
			if (!unitOfWork.UsersRepository.Exist(passenger.Email))
			{
				unitOfWork.UsersRepository.Add(passenger);
			}
			passenger.Blocked = true;
			unitOfWork.Complete();
		}

		[HttpPost]
		[Route("Refuse")]
		[Authorize(Roles = "Controller")]
		public void Refuse(string email)
		{
			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", "", "Your registration was denied", "registration");
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