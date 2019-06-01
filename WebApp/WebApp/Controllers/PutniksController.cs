using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.Users;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class PutniksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork unitOfWork { get; set; }
        public PutniksController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        // GET: api/Putniks
        public IQueryable<Putnik> GetPutniks()
        {
            
            return db.Putniks;
        }

        // GET: api/Putniks/5
        [ResponseType(typeof(Putnik))]
        public IHttpActionResult GetPutnik(int id)
        {
            Putnik putnik = db.Putniks.Find(id);
            if (putnik == null)
            {
                return NotFound();
            }

            return Ok(putnik);
        }

        // PUT: api/Putniks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPutnik(int id, Putnik putnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != putnik.Id)
            {
                return BadRequest();
            }
          
            db.Entry(putnik).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PutnikExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Putniks
        [ResponseType(typeof(Putnik))]
        public IHttpActionResult PostPutnik(Putnik putnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Putniks.Add(putnik);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = putnik.Id }, putnik);
        }

        // DELETE: api/Putniks/5
        [ResponseType(typeof(Putnik))]
        public IHttpActionResult DeletePutnik(int id)
        {
            Putnik putnik = db.Putniks.Find(id);
            if (putnik == null)
            {
                return NotFound();
            }

            db.Putniks.Remove(putnik);
            db.SaveChanges();

            return Ok(putnik);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PutnikExists(int id)
        {
            return db.Putniks.Count(e => e.Id == id) > 0;
        }
    }
}