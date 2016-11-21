using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class DeviceDetail
    {
        [Key]
        public int Id { get; set; }

        public int DetailTypeId { get; set; }

        public int DeviceId { get; set; }

        public string Value { get; set; }

        [ForeignKey("DeviceId")]
        public Device Device { get; set; }

        [ForeignKey("DetailTypeId")]
        public DetailType DetailType { get; set; }


    }
}