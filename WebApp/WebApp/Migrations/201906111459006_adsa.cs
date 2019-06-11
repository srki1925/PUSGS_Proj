namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adsa : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PriceListItems", "TicketDefinition_Id", "dbo.TicketDefinitions");
            DropIndex("dbo.PriceListItems", new[] { "TicketDefinition_Id" });
            AlterColumn("dbo.PriceListItems", "TicketDefinition_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.PriceListItems", "TicketDefinition_Id");
            AddForeignKey("dbo.PriceListItems", "TicketDefinition_Id", "dbo.TicketDefinitions", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PriceListItems", "TicketDefinition_Id", "dbo.TicketDefinitions");
            DropIndex("dbo.PriceListItems", new[] { "TicketDefinition_Id" });
            AlterColumn("dbo.PriceListItems", "TicketDefinition_Id", c => c.Int());
            CreateIndex("dbo.PriceListItems", "TicketDefinition_Id");
            AddForeignKey("dbo.PriceListItems", "TicketDefinition_Id", "dbo.TicketDefinitions", "Id");
        }
    }
}
