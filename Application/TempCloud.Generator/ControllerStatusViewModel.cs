using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.Generator
{
    public class ControllerStatusViewModel
    {
        public int DeviceId { get; set; }
        public DateTime SystemDateTime { get; set; }
        public int TypeId { get; set; }
        public int Value { get; set; }
    }
}
