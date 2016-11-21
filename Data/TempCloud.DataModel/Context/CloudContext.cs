using System.Data.Entity;
using TempCloud.DataModel.Migrations;
using TempCloud.DataModel.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace TempCloud.DataModel.Context
{
    public class CloudContext : IdentityDbContext<ApplicationUser>
    {
        public CloudContext() : base("CloudContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<CloudContext, Configuration>());

        }

        public DbSet<Type> Types { get; set; }
        public DbSet<Device> Devices { get; set; }

        public DbSet<DeviceDetail> DeviceDetails { get; set; }

        public DbSet<DetailType> DetailTypes { get; set; }

        public DbSet<Log> Logs { get; set; }

        public DbSet<LogHistory> LogHistories { get; set; }

        public DbSet<NotifyEmail> NotifyEmails { get; set; }

        public DbSet<Status> Statuses { get; set; }

        public DbSet<StatusHistory> StatusHistories { get; set; }

        public DbSet<UserDevice> UserDevices { get; set; }

        public DbSet<ExceptionLog> ExceptionLogs { get; set; }
    }
}