namespace WebApp.Migrations
{
	using System.Data.Entity.Migrations;

	public partial class First : DbMigration
	{
		public override void Up()
		{
			CreateTable(
				"dbo.Tickets",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					User_Id = c.String(maxLength: 128),
					IssueDate = c.DateTime(nullable: false, storeType: "datetime2"),
					Email = c.String(),
					TicketDefinition_Id = c.Int(),
					Passenger_Id = c.String(maxLength: 128),
				})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.TicketDefinitions", t => t.TicketDefinition_Id)
				.ForeignKey("dbo.AspNetUsers", t => t.User_Id)
				.ForeignKey("dbo.AspNetUsers", t => t.Passenger_Id)
				.Index(t => t.User_Id)
				.Index(t => t.TicketDefinition_Id)
				.Index(t => t.Passenger_Id);

			CreateTable(
				"dbo.TicketDefinitions",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Price = c.Decimal(nullable: false, precision: 18, scale: 2),
					TicketType = c.Int(nullable: false),
					Discriminator = c.String(nullable: false, maxLength: 128),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.BusStations",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Name = c.String(),
					Address = c.String(),
					Longitude = c.Double(nullable: false),
					Latitude = c.Double(nullable: false),
					Active = c.Boolean(nullable: false),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.Lines",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Name = c.String(),
					LineType = c.Int(nullable: false),
					Active = c.Boolean(nullable: false),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.Departures",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Time = c.String(),
					DayType = c.Int(nullable: false),
					LineId = c.Int(nullable: false),
					Active = c.Boolean(nullable: false),
				})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
				.Index(t => t.LineId);

			CreateTable(
				"dbo.PriceListItems",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					TicketDefinition_Id = c.Int(nullable: false),
					Active = c.Boolean(nullable: false),
				})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.TicketDefinitions", t => t.TicketDefinition_Id, cascadeDelete: true)
				.Index(t => t.TicketDefinition_Id);

			CreateTable(
				"dbo.PriceLists",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					From = c.DateTime(nullable: false, storeType: "datetime2"),
					To = c.DateTime(nullable: false, storeType: "datetime2"),
					Active = c.Boolean(nullable: false),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.LineBusStations",
				c => new
				{
					Line_Id = c.Int(nullable: false),
					BusStation_Id = c.Int(nullable: false),
				})
				.PrimaryKey(t => new { t.Line_Id, t.BusStation_Id })
				.ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
				.ForeignKey("dbo.BusStations", t => t.BusStation_Id, cascadeDelete: true)
				.Index(t => t.Line_Id)
				.Index(t => t.BusStation_Id);

			CreateTable(
				"dbo.PriceListPriceListItems",
				c => new
				{
					PriceList_Id = c.Int(nullable: false),
					PriceListItem_Id = c.Int(nullable: false),
				})
				.PrimaryKey(t => new { t.PriceList_Id, t.PriceListItem_Id })
				.ForeignKey("dbo.PriceLists", t => t.PriceList_Id, cascadeDelete: true)
				.ForeignKey("dbo.PriceListItems", t => t.PriceListItem_Id, cascadeDelete: true)
				.Index(t => t.PriceList_Id)
				.Index(t => t.PriceListItem_Id);

			AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
			AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
			AddColumn("dbo.AspNetUsers", "DoB", c => c.DateTime(storeType: "datetime2"));
			AddColumn("dbo.AspNetUsers", "UserType", c => c.Int());
			AddColumn("dbo.AspNetUsers", "Blocked", c => c.Boolean());
			AddColumn("dbo.AspNetUsers", "PassengerType", c => c.Int());
			AddColumn("dbo.AspNetUsers", "PassengerState", c => c.Int());
			AddColumn("dbo.AspNetUsers", "Activated", c => c.Boolean());
			AddColumn("dbo.AspNetUsers", "ImageUri", c => c.String());
			AddColumn("dbo.AspNetUsers", "Discriminator", c => c.String(nullable: false, maxLength: 128));
		}

		public override void Down()
		{
			DropForeignKey("dbo.PriceListItems", "TicketDefinition_Id", "dbo.TicketDefinitions");
			DropForeignKey("dbo.PriceListPriceListItems", "PriceListItem_Id", "dbo.PriceListItems");
			DropForeignKey("dbo.PriceListPriceListItems", "PriceList_Id", "dbo.PriceLists");
			DropForeignKey("dbo.Departures", "LineId", "dbo.Lines");
			DropForeignKey("dbo.LineBusStations", "BusStation_Id", "dbo.BusStations");
			DropForeignKey("dbo.LineBusStations", "Line_Id", "dbo.Lines");
			DropForeignKey("dbo.Tickets", "Passenger_Id", "dbo.AspNetUsers");
			DropForeignKey("dbo.Tickets", "User_Id", "dbo.AspNetUsers");
			DropForeignKey("dbo.Tickets", "TicketDefinition_Id", "dbo.TicketDefinitions");
			DropIndex("dbo.PriceListPriceListItems", new[] { "PriceListItem_Id" });
			DropIndex("dbo.PriceListPriceListItems", new[] { "PriceList_Id" });
			DropIndex("dbo.LineBusStations", new[] { "BusStation_Id" });
			DropIndex("dbo.LineBusStations", new[] { "Line_Id" });
			DropIndex("dbo.PriceListItems", new[] { "TicketDefinition_Id" });
			DropIndex("dbo.Departures", new[] { "LineId" });
			DropIndex("dbo.Tickets", new[] { "Passenger_Id" });
			DropIndex("dbo.Tickets", new[] { "TicketDefinition_Id" });
			DropIndex("dbo.Tickets", new[] { "User_Id" });
			DropColumn("dbo.AspNetUsers", "Discriminator");
			DropColumn("dbo.AspNetUsers", "ImageUri");
			DropColumn("dbo.AspNetUsers", "Activated");
			DropColumn("dbo.AspNetUsers", "PassengerState");
			DropColumn("dbo.AspNetUsers", "PassengerType");
			DropColumn("dbo.AspNetUsers", "Blocked");
			DropColumn("dbo.AspNetUsers", "UserType");
			DropColumn("dbo.AspNetUsers", "DoB");
			DropColumn("dbo.AspNetUsers", "LastName");
			DropColumn("dbo.AspNetUsers", "FirstName");
			DropTable("dbo.PriceListPriceListItems");
			DropTable("dbo.LineBusStations");
			DropTable("dbo.PriceLists");
			DropTable("dbo.PriceListItems");
			DropTable("dbo.Departures");
			DropTable("dbo.Lines");
			DropTable("dbo.BusStations");
			DropTable("dbo.TicketDefinitions");
			DropTable("dbo.Tickets");
		}
	}
}