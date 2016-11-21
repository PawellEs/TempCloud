using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class LogHistory
    {
        [Key]
        public int Id { get; set; }

        public DateTime LogDateTime { get; set; }

        public DateTime SystemDateTime { get; set; }

        public int DeviceId { get; set; }

        public bool IsDeleted { get; set; }

        [ForeignKey("DeviceId")]
        public Device Device { get; set; }

        public List<StatusHistory> Statuses { get; set; }
    }
}