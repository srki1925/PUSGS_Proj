using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;
using WebApp.Models.Users;

namespace WebApp.Persistence.Repository.PutnikRepo
{
    public interface IPutnikRepository:IRepository<Putnik,int>
    {
        void UpdatePhoto(int id, string imageUri);   
    }
    
}