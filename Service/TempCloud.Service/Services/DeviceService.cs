using System;
using System.Collections.Generic;
using TempCloud.Service.Interfaces;
using TempCloud.ViewModel;

namespace TempCloud.Service.Services
{
    public class DeviceService : ServiceBase, IDeviceService
    {
        public bool UpdateDeviceStatus(ControllerStatusViewModel crfiStatusItem)
        {
            throw new NotImplementedException();
        }

        public bool UpdateStatuses(List<ControllerStatusViewModel> crfiStatuses)
        {
            throw new NotImplementedException();
        }

        public DeviceViewModel GetDeviceById(int id)
        {
            throw new NotImplementedException();
        }

        public List<DeviceDetailViewModel> GetDeviceDetails(int deviceId)
        {
            throw new NotImplementedException();
        }

        public List<LogHistoryViewModel> GetDeviceHistoryAll(int deviceId)
        {
            throw new NotImplementedException();
        }

        public List<LogHistoryViewModel> GetDeviceHistoryByDate(int deviceId, DateTime start, DateTime end)
        {
            throw new NotImplementedException();
        }

        public List<LogHistoryViewModel> GetDeviceHistoryByDateAndType(int deviceId, DateTime start, DateTime end, int typeId)
        {
            throw new NotImplementedException();
        }

        public List<LogHistoryViewModel> GetDeviceHistoryByType(int deviceId, int typeId)
        {
            throw new NotImplementedException();
        }

        public List<LogViewModel> GetDeviceStatuses(int deviceId)
        {
            throw new NotImplementedException();
        }

        public List<LogViewModel> GetDeviceStatusesByType(int deviceId, int typeId)
        {
            throw new NotImplementedException();
        }

        public List<LogViewModel> GetDevicesWithStatusTypeAndValue(int typeId, int value)
        {
            throw new NotImplementedException();
        }
    }
}
