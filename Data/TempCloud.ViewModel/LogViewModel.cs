using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.ViewModel
{
    public class LogViewModel
    {
        public int Id { get; set; }
        public DateTime LogDateTime { get; set; }
        public DateTime SystemDateTime { get; set; }
        public int DeviceId { get; set; }
        public string DeviceName { get; set; }
        public int DeviceType { get; set; }
        public string DeviceTypeName { get; set; } 
    }
}
