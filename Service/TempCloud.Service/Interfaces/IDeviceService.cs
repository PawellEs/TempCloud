using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TempCloud.ViewModel;

namespace TempCloud.Service.Interfaces
{
    public interface IDeviceService
    {
        bool UpdateDeviceStatus(ControllerStatusViewModel crfiStatusItem);
        bool UpdateStatuses(List<ControllerStatusViewModel> crfiStatuses);

       // bool SaveExceptionLog(CrfiExceptionViewModel log);

        DeviceViewModel GetDeviceById(int id);
        List<DeviceViewModel> GetUserDevice(string userId);
        List<DeviceStatusViewModel> GetDevicesByType(int typeId, string userId);
        List<DeviceStatusViewModel> GetDevicesByPage(int page, int itemsNumber);
        bool AddOrUpdateDevice(string name, int deviceId, int typeId);
        bool DeleteDevice(int deviceId);
        List<DeviceViewModel> GetAllDevices();
        UserStatusesViewModel GetYesterdayLogsStatistics(string userId);
        UserStatusesViewModel GetDailyLogsStatistics(string userId);
        UserStatusesViewModel GetWeekLogsStatistics(string userId);
    }
}
