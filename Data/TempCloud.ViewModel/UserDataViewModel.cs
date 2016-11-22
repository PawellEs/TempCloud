using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.ViewModel
{
    public class UserDataViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime LastLoginDate { get; set; }
        public string Email { get; set; }
        public bool NotificationActive { get; set; }
        public int AlertInterval { get; set; }

        public int Role { get; set; }

        public List<int> AssignedDevices { get; set; }
    }
}
