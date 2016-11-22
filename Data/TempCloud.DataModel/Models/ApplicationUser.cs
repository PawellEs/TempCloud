using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace TempCloud.DataModel.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(127)]
        public string FirstName { get; set; }
        [MaxLength(127)]
        public string LastName { get; set; }
        [DefaultValue(1)]
        public int Active { get; set; }

        public DateTime RegistrationDate { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public bool IsDeleted { get; set; }

        public bool NotificationActive { get; set; }

        public int AlertInterval { get; set; }

        public List<UserDevice> UserDevices { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationRole : IdentityRole { }
}