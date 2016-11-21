using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class NotifyEmail
    {
        [Key]
        public int Id { get; set; }

        public int DeviceId { get; set; }

        public string Email { get; set; }

        public DateTime LastSendDate { get; set; }

        public int AlertInterval { get; set; }

        public bool IsActive { get; set; }

        [ForeignKey("DeviceId")]
        public Device Device { get; set; }
    }
}