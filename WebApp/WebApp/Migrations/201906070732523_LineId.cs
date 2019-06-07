namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LineId : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Departures", "Line_Id", "dbo.Lines");
            DropIndex("dbo.Departures", new[] { "Line_Id" });
            RenameColumn(table: "dbo.Departures", name: "Line_Id", newName: "LineId");
            AlterColumn("dbo.Departures", "LineId", c => c.Int(nullable: false));
            CreateIndex("dbo.Departures", "LineId");
            AddForeignKey("dbo.Departures", "LineId", "dbo.Lines", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Departures", "LineId", "dbo.Lines");
            DropIndex("dbo.Departures", new[] { "LineId" });
            AlterColumn("dbo.Departures", "LineId", c => c.Int());
            RenameColumn(table: "dbo.Departures", name: "LineId", newName: "Line_Id");
            CreateIndex("dbo.Departures", "Line_Id");
            AddForeignKey("dbo.Departures", "Line_Id", "dbo.Lines", "Id");
        }
    }
}
