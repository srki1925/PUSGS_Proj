using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.PutnikRepo
{
    public class PutnikRepository : Repository<Passenger, int>, IPutnikRepository
    {
        public PutnikRepository(DbContext context) : base(context)
        {
        }

        public void UpdatePhoto(int id, string imageUri)
        {
            Passenger putnik = Get(id);
            putnik.ImageUri = imageUri;
            Update(putnik);
        }
    }
}