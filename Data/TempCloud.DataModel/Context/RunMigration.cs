using System.Data.Entity;
using TempCloud.DataModel.Migrations;

namespace TempCloud.DataModel.Context
{
    public class RunMigration
    {
        public RunMigration()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<CloudContext, Configuration>());
        }
    }
}