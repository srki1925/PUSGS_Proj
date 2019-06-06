using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models.Enums;
using WebApp.Models.RequestModel.PassengerRequest;
using WebApp.Models.Users;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{   [RoutePrefix("api/Passenger")]
    public class PassengerController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public PassengerController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

       [HttpPost]
       [Route("Register")]
       public IHttpActionResult Register(RegistrationRequest registrationRequest)
        {
            var user = unitOfWork.UsersRepository.Exist(registrationRequest.Email);
            var pass = unitOfWork.PassengerServices.Exist(registrationRequest.Email);
      

            if (!user && !pass)
            {

                Passenger passenger = new Passenger
                {
                    Email = registrationRequest.Email,
                    FirstName = registrationRequest.FirstName,
                    LastName = registrationRequest.LastName,
                    ImageUri = registrationRequest.ImageUri,
                    PassengerType = registrationRequest.PassengerType,
                    Password = registrationRequest.Password
                };
                if(passenger.PassengerType == PassengerType.Regular)
                    unitOfWork.UsersRepository.Add(passenger);
                else
                    unitOfWork.PassengerServices.Add(passenger);

                unitOfWork.Complete();
                return Ok();

            }
            return NotFound();
        }

        [HttpGet]
        [Route("ActivationList")]
        public IHttpActionResult ActivationList()
        {
            return Ok(unitOfWork.PassengerServices.GetAll());
        }

    }
}
