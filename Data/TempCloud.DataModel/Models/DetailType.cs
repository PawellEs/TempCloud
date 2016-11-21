using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TempCloud.DataModel.Models
{
    public class DetailType
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public List<DeviceDetail> Details { get; set; }
    }
}