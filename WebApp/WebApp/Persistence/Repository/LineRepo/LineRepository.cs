using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.LineRepo
{
	public sealed class LineRepository : Repository<Line, int>, ILineRepository
	{
        private ApplicationDbContext _context;
		public LineRepository(DbContext context) : base(context)
		{
            _context = context as ApplicationDbContext;
		}

        public Line GetLine(Expression<Func<Line, bool>> predicate)
        {
            if (_context.Lines.Any(predicate))
            {
                return _context.Lines.Where(predicate).Include(x => x.Stations).First();
            }
            return null;

        }

        public List<Line> GetLines(Expression<Func<Line, bool>> predicate)
        {
            if (_context.Lines.Any(predicate))
            {
                return _context.Lines.Where(predicate).Include( x=> x.Stations).ToList();

            }
            return null;
        }
    }
}