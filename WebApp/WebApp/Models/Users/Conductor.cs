using WebApp.Models.Enums;

namespace WebApp.Models.Users
{
	public class Conductor : User
	{
		public Conductor()
		{
			UserType = UserType.Conductor;
		}
	}
}