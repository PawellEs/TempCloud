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

        List<DeviceDetailViewModel> GetDeviceDetails(int deviceId);

        List<LogViewModel> GetDeviceStatuses(int deviceId);

        List<LogViewModel> GetDeviceStatusesByType(int deviceId, int typeId);

        List<LogViewModel> GetDevicesWithStatusTypeAndValue(int typeId, int value);

        List<LogHistoryViewModel> GetDeviceHistoryAll(int deviceId);

        List<LogHistoryViewModel> GetDeviceHistoryByDate(int deviceId, DateTime start, DateTime end);

        List<LogHistoryViewModel> GetDeviceHistoryByType(int deviceId, int typeId);

        List<LogHistoryViewModel> GetDeviceHistoryByDateAndType(int deviceId, DateTime start, DateTime end, int typeId);

    }
}
