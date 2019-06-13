using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.RequestModel.TicketRequestModel;
using WebApp.Models.ResponseModel;
using WebApp.Models.Users;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/Ticket")]
	public class TicketController : ApiController
	{
		private IUnitOfWork unitOfWork;

		public TicketController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[Authorize(Roles = "Passenger")]
		[HttpGet]
		public IHttpActionResult GetAll()
		{
			var now = DateTime.Now;
			var priceList = unitOfWork.PriceListServices.GetPriceList(x => x.Active && x.From < now && x.To > now);
			var user = unitOfWork.UsersRepository.Get(HttpContext.Current.User.Identity.Name);
			if (priceList != null && user != null && !user.Blocked)
			{
				var type = (user as Passenger).PassengerType;
				return Ok(priceList.PriceListItems.ConvertAll(x => new TicketDefinitionResponse(x.TicketDefinition, type)));
			}
			return Ok(new List<TicketDefinitionResponse>(0));
		}

		[Route("regular")]
		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult GetRegular()
		{
			var now = DateTime.Now;
			var priceList = unitOfWork.PriceListServices.GetPriceList(x => x.Active && x.From < now && x.To >= now);
			if (priceList != null)
			{
				return Ok(priceList.PriceListItems.ConvertAll(x => new TicketDefinitionResponse(x.TicketDefinition)));
			}
			return NotFound();
		}

		[Route("buy/{id}")]
		[HttpGet]
		[Authorize(Roles = "Passenger")]
		public IHttpActionResult BuyTicket(int id)
		{
			if (unitOfWork.TicketDefinitionRepository.Get(id) == null) return NotFound();

			var user = unitOfWork.UsersRepository.Find(x => x.UserName == HttpContext.Current.User.Identity.Name).First();
			var ticketDefinition = unitOfWork.TicketDefinitionRepository.Get(id);
			var ticket = new Ticket()
			{
				IssueDate = DateTime.Now,
				Email = user.Email,
				TicketDefinition = ticketDefinition,
				User = user
			};

			unitOfWork.TicketServices.Add(ticket);
			unitOfWork.Complete();

			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", user.Email, $"You bought {(user as Passenger).PassengerType} {ticketDefinition.TicketType} ticket with id {ticket.Id}", "Your ticket");

			return Ok();
		}

		[Route("buyRegular")]
		[HttpPost]
		[AllowAnonymous]
		public IHttpActionResult BuyRegular([FromBody]TicketRequestModel request)
		{
			if (HttpContext.Current.User.Identity.IsAuthenticated)
			{
				return BadRequest("This api is open only to anonymous users.");
			}

			var ticketDefinition = unitOfWork.TicketDefinitionRepository.Get(request.TicketDefinitionId);
			var ticket = new Ticket()
			{
				Email = request.Email,
				IssueDate = DateTime.Now,
				TicketDefinition = ticketDefinition
			};

			unitOfWork.TicketServices.Add(ticket);
			unitOfWork.Complete();

			SendMail("drugtitosevracakuci@gmail.com", "vinjak10", request.Email, $"You bought regular {ticketDefinition.TicketType} ticket with id {ticket.Id}", "Your ticket");

			return Ok();
		}

		[HttpGet]
		[Authorize(Roles = "Passenger")]
		[Route("alltickets")]
		public IHttpActionResult GetActiveTickets()
		{
			var user = unitOfWork.UsersRepository.Find(x => x.UserName == HttpContext.Current.User.Identity.Name).First();
			var tickets = unitOfWork.TicketServices.GetTicketsForUser(user.Id);
			if (tickets.Count > 0)
			{
				return Ok(tickets.Where(x => x.Valid).Select(x => new TicketResponseModel(x)));
			}
			return Ok(new List<TicketResponseModel>(0));
		}

		private void SendMail(string emailFrom, string pw, string emailTo, string body, string subject)
		{
			MailMessage mail = new MailMessage();
			SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
			mail.To.Add(emailTo);
			mail.Subject = subject;
			mail.Body = body;
			mail.From = new MailAddress(emailFrom);
			SmtpServer.Credentials = new System.Net.NetworkCredential(emailFrom, pw);
			SmtpServer.EnableSsl = true;
			SmtpServer.Port = 587;
			SmtpServer.Send(mail);
		}
	}
}