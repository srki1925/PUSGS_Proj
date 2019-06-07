using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        public void Accept(int id)
        {
            SendMail("","andrejftniviciak@gmail.com", "Your registration was accepted", "registration");
            var passenger = unitOfWork.PassengerServices.Get(id);
            unitOfWork.UsersRepository.Add(passenger);
            passenger.Blocked = true;
            unitOfWork.Complete();
        }

        [HttpPost]
        [Route("Refuse")]
        public void Refuse(string email)
        {

        }

        private void SendMail(string emailFrom,string emailTo,string body,string subject)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = body;
            mail.From = new MailAddress("djavo96iviciak@gmail.com");
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("djavo96iviciak@gmail.com", "");
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
        }
    }
}
