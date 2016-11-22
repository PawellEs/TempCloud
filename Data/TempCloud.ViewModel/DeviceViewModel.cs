using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.ViewModel
{
    public class DeviceViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public List<DeviceDetailViewModel> DeviceDetails { get; set; }

    }
}
