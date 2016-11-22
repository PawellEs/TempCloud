using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity.Migrations;
using TempCloud.DataModel.Context;
using TempCloud.DataModel.Models;

namespace TempCloud.DataModel.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<CloudContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;

        }

        protected override void Seed(CloudContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            /*var manager = new UserManager<ApplicationUser>(
             new UserStore<ApplicationUser>(
                 new CloudContext()));
            var user = new ApplicationUser()
            {
                UserName = "Admin",
                Email = "admin@admin.pl",
                EmailConfirmed = true,
                FirstName = "Admin",
                LastName = "Admin",
                Active = 1
                
            };
            manager.Create(user, "qwerty");*/
            var passwordHash = new PasswordHasher();
            string password = passwordHash.HashPassword("qwerty");
            context.Users.AddOrUpdate(u => u.UserName,
                new ApplicationUser
                {
                    UserName = "admin@admin.com",
                    PasswordHash = password,
                    PhoneNumber = "08869879",
                    Email = "admin@admin.com",
                    EmailConfirmed = true,
                    LastLoginDate = DateTime.Now,
                    RegistrationDate = DateTime.Now,
                    Active = 1,
                    SecurityStamp = Guid.NewGuid().ToString("D")

                });

        }
    }
}
