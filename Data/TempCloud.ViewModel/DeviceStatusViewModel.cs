using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.ViewModel
{
    public class DeviceStatusViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DeviceName { get; set; }
        public int StatusValue { get; set; }
        public int DeviceId { get; set; }
        public DateTime LastUpdate { get; set; }
        public bool NoConnection { get; set; }
    }
}
