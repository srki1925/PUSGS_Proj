namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Second : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departures",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Time = c.String(),
                        DayType = c.Int(nullable: false),
                        Active = c.Boolean(nullable: false),
                        Line_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Line_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Departures", "Line_Id", "dbo.Lines");
            DropIndex("dbo.Departures", new[] { "Line_Id" });
            DropTable("dbo.Departures");
        }
    }
}
