using WebApp.Models.Enums;

namespace WebApp.Models.Users
{
	public class Administrator : User
	{
		public Administrator()
		{
			UserType = UserType.Administrator;
		}
	}
}