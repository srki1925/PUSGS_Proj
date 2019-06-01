namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class First : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        LastName = c.String(),
                        Username = c.String(),
                        Password = c.String(),
                        Email = c.String(),
                        UserType = c.Int(nullable: false),
                        Active = c.Boolean(nullable: false),
                        PassengerType = c.Int(),
                        ImageUri = c.String(),
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
                        Longitude = c.String(),
                        Latitude = c.String(),
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
                "dbo.PriceListItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Active = c.Boolean(nullable: false),
                        TicketDefinition_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TicketDefinitions", t => t.TicketDefinition_Id)
                .Index(t => t.TicketDefinition_Id);
            
            CreateTable(
                "dbo.PriceLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        From = c.DateTime(nullable: false),
                        To = c.DateTime(nullable: false),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TicketDefinitions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ValidFrom = c.DateTime(nullable: false),
                        ValidTo = c.DateTime(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TicketType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Active = c.Boolean(nullable: false),
                        Email = c.String(),
                        Korisnik_Id = c.Int(),
                        TicketDefinition_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Korisnik_Id)
                .ForeignKey("dbo.TicketDefinitions", t => t.TicketDefinition_Id)
                .Index(t => t.Korisnik_Id)
                .Index(t => t.TicketDefinition_Id);
            
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "TicketDefinition_Id", "dbo.TicketDefinitions");
            DropForeignKey("dbo.Tickets", "Korisnik_Id", "dbo.Users");
            DropForeignKey("dbo.PriceListItems", "TicketDefinition_Id", "dbo.TicketDefinitions");
            DropForeignKey("dbo.PriceListPriceListItems", "PriceListItem_Id", "dbo.PriceListItems");
            DropForeignKey("dbo.PriceListPriceListItems", "PriceList_Id", "dbo.PriceLists");
            DropForeignKey("dbo.LineBusStations", "BusStation_Id", "dbo.BusStations");
            DropForeignKey("dbo.LineBusStations", "Line_Id", "dbo.Lines");
            DropIndex("dbo.PriceListPriceListItems", new[] { "PriceListItem_Id" });
            DropIndex("dbo.PriceListPriceListItems", new[] { "PriceList_Id" });
            DropIndex("dbo.LineBusStations", new[] { "BusStation_Id" });
            DropIndex("dbo.LineBusStations", new[] { "Line_Id" });
            DropIndex("dbo.Tickets", new[] { "TicketDefinition_Id" });
            DropIndex("dbo.Tickets", new[] { "Korisnik_Id" });
            DropIndex("dbo.PriceListItems", new[] { "TicketDefinition_Id" });
            DropTable("dbo.PriceListPriceListItems");
            DropTable("dbo.LineBusStations");
            DropTable("dbo.Tickets");
            DropTable("dbo.TicketDefinitions");
            DropTable("dbo.PriceLists");
            DropTable("dbo.PriceListItems");
            DropTable("dbo.Lines");
            DropTable("dbo.BusStations");
            DropTable("dbo.Users");
        }
    }
}
