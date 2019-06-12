using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.RequestModel.PriceListRequest;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{   [RoutePrefix("api/pricelist")]
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
        public void CreatePriceList(PriceListCreationRequest priceListCreationRequest)
        {

            var priceList = new PriceList();
            priceList.PriceListItems = new List<PriceListItem>();
            priceList.Active = true;
            priceList.To = priceListCreationRequest.To;
            priceList.From = priceListCreationRequest.From;
            foreach (var item in priceListCreationRequest.PriceListItems)
            {
                priceList.PriceListItems.Add(unitOfWork.PriceListItemServices.Get(item));
            }
            unitOfWork.PriceListServices.Add(priceList);
            unitOfWork.Complete();
        }
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult Get(int id)
        {
            var list = unitOfWork.PriceListServices.GetPriceList(x => x.Id == id && x.Active);
            if(list != null)
            {
                return Ok(list);
            }
            return NotFound();
        }
        [HttpDelete]
        [Route("removePriceList/{id}")]
        public IHttpActionResult Remove(int id)
        {
            var priceList = unitOfWork.PriceListServices.Get(id);
            if(priceList != null)
            {
                priceList.Active = false;
                unitOfWork.Complete();
                return Ok();
            }
            return NotFound();
        }
    }
}
