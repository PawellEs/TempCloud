using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TempCloud.DataModel.Models
{
    public class Type
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public List<Device> Devices { get; set; }
    }
}