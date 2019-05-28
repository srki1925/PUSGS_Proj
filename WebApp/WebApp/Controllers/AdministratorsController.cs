﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models.Users;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class AdministratorsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork unitOfWork;
        public AdministratorsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        // GET: api/Administrators
        public IQueryable<Administrator> GetAdministrators()
        {
            return db.Administrators;
        }

        // GET: api/Administrators/5
        [ResponseType(typeof(Administrator))]
        public IHttpActionResult GetAdministrator(int id)
        {
            Administrator administrator = db.Administrators.Find(id);
            if (administrator == null)
            {
                return NotFound();
            }

            return Ok(administrator);
        }

        // PUT: api/Administrators/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAdministrator(int id, Administrator administrator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != administrator.Id)
            {
                return BadRequest();
            }

            db.Entry(administrator).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministratorExists(id))
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

        // POST: api/Administrators
        [ResponseType(typeof(Administrator))]
        public IHttpActionResult PostAdministrator(Administrator administrator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Administrators.Add(administrator);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = administrator.Id }, administrator);
        }

        // DELETE: api/Administrators/5
        [ResponseType(typeof(Administrator))]
        public IHttpActionResult DeleteAdministrator(int id)
        {
            Administrator administrator = db.Administrators.Find(id);
            if (administrator == null)
            {
                return NotFound();
            }

            db.Administrators.Remove(administrator);
            db.SaveChanges();

            return Ok(administrator);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AdministratorExists(int id)
        {
            return db.Administrators.Count(e => e.Id == id) > 0;
        }
    }
}