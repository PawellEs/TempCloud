using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.ViewModel
{
    public class NotificationAlertsViewModel
    {
        public int Id { get; set; }
        public int DeviceId { get; set; }
        public string Email { get; set; }
        public DateTime LastSendDate { get; set; }
        public int AlertInterval { get; set; }
    }
}
