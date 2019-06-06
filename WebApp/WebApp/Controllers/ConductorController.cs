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
            //SendMail("djavo96iviciak@gmail.com","andrejftniviciak@gmail.com", "Your registration was accepted", "registration");
            var passenger = unitOfWork.PassengerServices.Get(id);
            unitOfWork.UsersRepository.Add(passenger);
            unitOfWork.PassengerServices.Remove(passenger);
            unitOfWork.Complete();
        }

        [HttpPost]
        [Route("Refuse")]
        public void Refuse(string email)
        {

        }

        private void SendMail(string emailFrom,string emailTo,string body,string subject)
        {
            MailMessage email = new MailMessage(emailFrom,emailTo);
            SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
            email.Subject = subject;
            email.Body = body;
            email.From = new MailAddress(emailFrom);
            smtpServer.Port = 587;
            smtpServer.Credentials = new NetworkCredential(emailFrom, "");
            smtpServer.Send(email);
        }
    }
}
