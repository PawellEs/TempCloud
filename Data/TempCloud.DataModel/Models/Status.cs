using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempCloud.DataModel.Models
{
    public class Status
    {
        [Key]
        public int Id { get; set; }

        public int LogId { get; set; }

        public int Value { get; set; }

        public int TypeId { get; set; }


        [ForeignKey("LogId")]
        public Log Log { get; set; }
    }
}