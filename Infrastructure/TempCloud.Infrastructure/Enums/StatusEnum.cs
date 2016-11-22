using System.ComponentModel;

namespace TempCloud.Infrastructure.Enums
{
    public enum StatusEnum
    {
        [Description("Not Working")]
        NotWorking = 0,
        [Description("Working")]
        Working = 1,
        [Description("Unknown Error")]
        UnknownError = 2
    }
}
