using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class UserDevice
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }

        public int DeviceId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        [ForeignKey("DeviceId")]
        public Device Device { get; set; }
    }
}