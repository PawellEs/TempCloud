using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.ViewModel
{
    public class DeviceExceptionViewModel
    {
        public int DeviceId { get; set; }
        public string Guid { get; set; }
        public DateTime SystemDateTime { get; set; }
        public string Value { get; set; }
    }
}
