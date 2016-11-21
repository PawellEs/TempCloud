using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class ExceptionLog
    {
        [Key]
        public int Id { get; set; }

        public DateTime LogDateTime { get; set; }

        public DateTime SystemDateTime { get; set; }

        public int DeviceId { get; set; }

        public string Value { get; set; }

        [ForeignKey("DeviceId")]
        public Device Device { get; set; }

    }
}