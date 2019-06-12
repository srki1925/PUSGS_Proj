using WebApp.Models.Enums;

namespace WebApp.Models.ResponseModel
{
	public class TicketDefinitionResponse
	{
		public TicketDefinitionResponse(TicketDefinition definition, PassengerType type = PassengerType.Regular)
		{
			Id = definition.Id;
			Price = definition.Price;
			TicketType = definition.TicketType.ToString();

			ModifyPrice(type);
		}

		public int Id { get; set; }

		public string TicketType { get; set; }

		public decimal Price { get; set; }

		private void ModifyPrice(PassengerType type)
		{
			switch (type)
			{
				case PassengerType.Student:
					Price *= 0.7m;
					break;

				case PassengerType.Retired:
					Price *= 0.6m;
					break;
			}
		}
	}
}