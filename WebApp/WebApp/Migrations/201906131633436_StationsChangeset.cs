namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StationsChangeset : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.LineBusStations", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.LineBusStations", "BusStation_Id", "dbo.BusStations");
            DropIndex("dbo.LineBusStations", new[] { "Line_Id" });
            DropIndex("dbo.LineBusStations", new[] { "BusStation_Id" });
            CreateTable(
                "dbo.OrderedBusStations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Station_Id = c.Int(),
                        Line_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusStations", t => t.Station_Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Station_Id)
                .Index(t => t.Line_Id);
            
            AddColumn("dbo.Lines", "BusStation_Id", c => c.Int());
            CreateIndex("dbo.Lines", "BusStation_Id");
            AddForeignKey("dbo.Lines", "BusStation_Id", "dbo.BusStations", "Id");
            DropTable("dbo.LineBusStations");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.LineBusStations",
                c => new
                    {
                        Line_Id = c.Int(nullable: false),
                        BusStation_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Line_Id, t.BusStation_Id });
            
            DropForeignKey("dbo.Lines", "BusStation_Id", "dbo.BusStations");
            DropForeignKey("dbo.OrderedBusStations", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.OrderedBusStations", "Station_Id", "dbo.BusStations");
            DropIndex("dbo.OrderedBusStations", new[] { "Line_Id" });
            DropIndex("dbo.OrderedBusStations", new[] { "Station_Id" });
            DropIndex("dbo.Lines", new[] { "BusStation_Id" });
            DropColumn("dbo.Lines", "BusStation_Id");
            DropTable("dbo.OrderedBusStations");
            CreateIndex("dbo.LineBusStations", "BusStation_Id");
            CreateIndex("dbo.LineBusStations", "Line_Id");
            AddForeignKey("dbo.LineBusStations", "BusStation_Id", "dbo.BusStations", "Id", cascadeDelete: true);
            AddForeignKey("dbo.LineBusStations", "Line_Id", "dbo.Lines", "Id", cascadeDelete: true);
        }
    }
}
