namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LineVersioning : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BusStations", "VersionId", c => c.Long(nullable: false));
            AddColumn("dbo.BusStations", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Lines", "VersionId", c => c.Long(nullable: false));
            AddColumn("dbo.Lines", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Lines", "RowVersion");
            DropColumn("dbo.Lines", "VersionId");
            DropColumn("dbo.BusStations", "RowVersion");
            DropColumn("dbo.BusStations", "VersionId");
        }
    }
}
