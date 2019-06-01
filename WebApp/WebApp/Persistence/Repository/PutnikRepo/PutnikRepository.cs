using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository
{
    public class PutnikRepository : Repository<Putnik, int>, IPutnikRepository
    {
        public PutnikRepository(DbContext context) : base(context)
        {
        }

        public void UpdatePhoto(int id, string imageUri)
        {
            Putnik putnik = Get(id);
            putnik.ImageUri = imageUri;
            Update(putnik);
        }
    }
}