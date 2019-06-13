namespace WebApp.Migrations
{
	using System.Data.Entity.Migrations;

	public partial class Passenger_PassengerStates : DbMigration
	{
		public override void Up()
		{
			AddColumn("dbo.AspNetUsers", "PassengerState", c => c.Int());
		}

		public override void Down()
		{
			DropColumn("dbo.AspNetUsers", "PassengerState");
		}
	}
}