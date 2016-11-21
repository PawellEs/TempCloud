using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class StatusHistory
    {
        [Key]
        public int Id { get; set; }

        public int LogHistoryId { get; set; }

        public int Value { get; set; }

        public int TypeId { get; set; }


        [ForeignKey("LogHistoryId")]
        public LogHistory LogHistory { get; set; }
    }
}