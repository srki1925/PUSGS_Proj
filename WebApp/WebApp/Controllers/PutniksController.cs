using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models.Users;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
	public class PutniksController : ApiController
	{
		private ApplicationDbContext db = new ApplicationDbContext();

		private IUnitOfWork unitOfWork;

		public PutniksController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		// GET: api/Putniks
		public IQueryable<Passenger> GetPutniks()
		{
			return db.Passengers;
		}

		// GET: api/Putniks/5
		[ResponseType(typeof(Passenger))]
		public IHttpActionResult GetPutnik(int id)
		{
			Passenger putnik = db.Passengers.Find(id);
			if (putnik == null)
			{
				return NotFound();
			}

			return Ok(putnik);
		}

		// PUT: api/Putniks/5
		[ResponseType(typeof(void))]
		public IHttpActionResult PutPutnik(int id, Passenger putnik)
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
		[ResponseType(typeof(Passenger))]
		public IHttpActionResult PostPutnik(Passenger putnik)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			db.Passengers.Add(putnik);
			db.SaveChanges();

			return CreatedAtRoute("DefaultApi", new { id = putnik.Id }, putnik);
		}

		// DELETE: api/Putniks/5
		[ResponseType(typeof(Passenger))]
		public IHttpActionResult DeletePutnik(int id)
		{
			Passenger putnik = db.Passengers.Find(id);
			if (putnik == null)
			{
				return NotFound();
			}

			db.Passengers.Remove(putnik);
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
			return db.Passengers.Count(e => e.Id == id) > 0;
		}
	}
}