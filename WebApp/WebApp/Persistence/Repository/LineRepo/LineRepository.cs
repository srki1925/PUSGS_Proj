using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.LineRepo
{
	public sealed class LineRepository : Repository<Line, int>, ILineRepository
	{
		public LineRepository(DbContext context) : base(context)
		{
		}

        public Line GetLine(string Name)
        {
            
            return  Find(x => x.Name == Name && x.Active == true) as Line;

        }

        
    }
}