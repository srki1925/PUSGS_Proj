using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IPutnikRepository:IRepository<Putnik,int>
    {
        void UpdatePhoto(int id, string imageUri);   
    }
    
}