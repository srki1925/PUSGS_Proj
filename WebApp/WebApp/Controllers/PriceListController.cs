using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.RequestModel.PriceListRequest;
using WebApp.Persistence.UnitOfWork;
using System.Linq;

namespace WebApp.Controllers
{
	[RoutePrefix("api/pricelist")]
	public class PriceListController : ApiController
	{
		private readonly IUnitOfWork unitOfWork;

		public PriceListController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpGet]
		[Route("pricelists")]
		public IHttpActionResult GetPriceLists()
		{
			return Ok(unitOfWork.PriceListServices.GetPriceLists(x => x.Active));
		}

		[HttpPost]
		[Route("createPriceList")]
        [Authorize(Roles ="Admin")]
		public void CreatePriceList(PriceListCreationRequest priceListCreationRequest)
		{
			var priceList = new PriceList();
			priceList.PriceListItems = new List<PriceListItem>();
			priceList.Active = true;
			priceList.To = priceListCreationRequest.To;
			priceList.From = priceListCreationRequest.From;
			foreach (var item in priceListCreationRequest.PriceListItems)
			{//ako pukne add item.list.add(priceList)
				priceList.PriceListItems.Add(unitOfWork.PriceListItemServices.GetItem(x=> x.Id == item && x.Active));
			}
            priceList.PriceListItems.OrderBy(x => x.TicketDefinition.TicketType);
            unitOfWork.PriceListServices.Add(priceList);
			unitOfWork.Complete();
		}

		[HttpGet]
		[Route("{id}")]
		public IHttpActionResult Get(int id)
		{
			var list = unitOfWork.PriceListServices.GetPriceList(x => x.Id == id && x.Active);
			if (list != null)
			{
               list.PriceListItems =  list.PriceListItems.OrderBy(x => x.TicketDefinition.TicketType).ToList();
				return Ok(list);
			}
			return NotFound();
		}

		[HttpDelete]
		[Route("{id}")]
        [Authorize(Roles ="Admin")]
		public IHttpActionResult Delete(int id)
		{
			var priceList = unitOfWork.PriceListServices.Get(id);
			if (priceList != null && priceList.Active)
			{
				priceList.Active = false;
				unitOfWork.Complete();
				return Ok();
			}
			return StatusCode(HttpStatusCode.Gone);
		}

        [HttpPut]
        [Route("Update")]
        [Authorize(Roles ="Admin")]
        public IHttpActionResult Update(PriceListUpdateRequest update)
        {
            var list = unitOfWork.PriceListServices.GetPriceList(x => x.Active && x.Id == update.Id);
            list.PriceListItems = list.PriceListItems.OrderBy(x => x.TicketDefinition.TicketType).ToList();
            if (list != null)
            {
                for (int i = 0; i < 4; i++)
                {
                    var id = update.PriceListItems[i];
                    var item = unitOfWork.PriceListItemServices.GetItem(x => x.Id == id && x.Active);
                    list.PriceListItems[i] = item;
                }
               list.PriceListItems = list.PriceListItems.OrderBy(x => x.TicketDefinition.TicketType).ToList();
                unitOfWork.Complete();
                return Ok();
            }
            return NotFound();
        }

    }
}
