using WebApp.Models;

namespace WebApp.Persistence.Repository.LineRepo
{
	public interface ILineRepository : IRepository<Line, int>
	{
        Line GetLine(string Name);
	}
}