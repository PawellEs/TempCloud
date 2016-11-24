using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class Device
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public List<UserDevice> DeviceUsers { get; set; }

        public List<NotifyEmail> NotifyEmails { get; set; }

        public int TypeId { get; set; }

        [ForeignKey("TypeId")]
        public Type Type { get; set; }

        public List<Log> Logs { get; set; }

        public List<LogHistory> LogsHistory { get; set; }

        public List<DeviceDetail> Details { get; set; }
    }
}