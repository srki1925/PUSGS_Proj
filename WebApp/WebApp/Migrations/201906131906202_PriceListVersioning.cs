namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PriceListVersioning : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PriceLists", "VersionId", c => c.Long(nullable: false));
            AddColumn("dbo.PriceLists", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PriceLists", "RowVersion");
            DropColumn("dbo.PriceLists", "VersionId");
        }
    }
}
