﻿using System.Web.Http;
using WebApp.Models;
using WebApp.Models.Finances.Ticket_Definitions;
using WebApp.Models.RequestModel.PriceListItemRequest;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	[RoutePrefix("api/PriceListItem")]
	public class PriceListItemController : ApiController
	{
		private readonly IUnitOfWork unitOfWork;

      

        [Route("PriceListItems/{ticketType}")]
        [HttpGet]
        public IHttpActionResult GetAllForType(int ticketType)
        {
            return Ok(unitOfWork.PriceListItemServices.GetPriceListItems(x => x.Active && x.TicketDefinition.TicketType == (TicketType)ticketType));
        }

        [Route("PriceListItems")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var items = unitOfWork.PriceListItemServices.GetPriceListItems(x=> x.Active);
            return Ok(items);
        }
		public PriceListItemController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[Route("CreatePriceListItem")]
		[HttpPost]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult CreatePriceListItem(PriceListItemCreationRequest priceListItem)
		{
			var priceList = new PriceListItem();
			switch (priceListItem.TicketType)
			{
				case Models.TicketType.Hour:
					priceList.TicketDefinition = new HourTicketDefinition();
					priceList.TicketDefinition.Price = priceListItem.Price;
					break;

				case Models.TicketType.Day:
					priceList.TicketDefinition = new DayTicketDefinition();
					priceList.TicketDefinition.Price = priceListItem.Price;
					break;

				case Models.TicketType.Month:
					priceList.TicketDefinition = new MonthTicketDefinition();
					priceList.TicketDefinition.Price = priceListItem.Price;
					break;

				case Models.TicketType.Year:
					priceList.TicketDefinition = new YearTicketDefinition();
					priceList.TicketDefinition.Price = priceListItem.Price;
					break;

				default:
					return NotFound();
			}
            priceList.Active = true;
			unitOfWork.PriceListItemServices.Add(priceList);
			unitOfWork.Complete();
			return Ok();
		}

		[Route("RemovePriceListItem/{id}")]
		[HttpDelete]
		[Authorize(Roles = "Admin")]
		public IHttpActionResult RemovePriceListItem(int id)
		{
			var priceListItem = unitOfWork.PriceListItemServices.Get(id);
			if (priceListItem != null && priceListItem.Active)
			{
				priceListItem.Active = false;
				unitOfWork.Complete();
				return Ok();
			}
			return NotFound();
		}
	}
}