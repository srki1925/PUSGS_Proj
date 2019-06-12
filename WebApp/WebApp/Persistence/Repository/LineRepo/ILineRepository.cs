using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using WebApp.Models;

namespace WebApp.Persistence.Repository.LineRepo
{
	public interface ILineRepository : IRepository<Line, int>
	{
        Line GetLine(string Name);
        List<Line> GetLines(Expression<Func<Line, bool>> predicate);
	}
}