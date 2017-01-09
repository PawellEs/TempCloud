using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using TempCloud.DataModel.Models;
using TempCloud.Service.Interfaces;
using TempCloud.ViewModel;

namespace TempCloud.Service.Services
{
    public class DeviceService : ServiceBase, IDeviceService
    {
        public DeviceViewModel GetDeviceById(int id)
        {
            try
            {
                using (var context = this.GetDataContext())
                {

                    var device = context.Devices.FirstOrDefault(x => x.Id == id);
                    var result = AutoMapper.Mapper.Map<DeviceViewModel>(device);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<DeviceViewModel> GetUserDevice(string userId)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var result = context.Database.SqlQuery<DeviceViewModel>(
                        @"SELECT distinct d.Id, d.Name, d.TypeId, t.Name as TypeName, s.Value as Value
                            FROM Devices d
                            JOIN UserDevices ud on ud.DeviceId=d.Id and ud.UserId='" + userId + @"'
                            JOIN Types t on d.TypeId = t.Id
                            JOIN Logs l on d.Id = l.DeviceId
                            Join Status s on l.Id = s.LogId
                            Where d.IsDeleted = 0"
                        ).ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public List<DeviceStatusViewModel> GetDevicesByType(int typeId, string userId)
        {
            var result = new List<DeviceStatusViewModel>();
            try
            {
                using (var context = this.GetDataContext())
                {
                    var hourAgo = DateTime.Now.AddHours(-1);
                    var devices =
                        context.Logs.Where(x => x.Device.TypeId == typeId)
                            .Select(x => new DeviceStatusViewModel() { Id = x.DeviceId, Name = x.Device.Name, StatusValue = x.Statuses.FirstOrDefault().Value, NoConnection = (x.LogDateTime < hourAgo), LastUpdate = x.LogDateTime }).ToList();
                    return devices;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return result;
        }

        public List<DeviceStatusViewModel> GetDevicesByPage(int page, int itemsNumber)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    if (page == 0)
                    {
                        page = 1;
                    }

                    var devices = context.Logs.Skip((page - 1) * itemsNumber).Take(itemsNumber)
                        .Select(x => new DeviceStatusViewModel() { Id = x.DeviceId, Name = x.Device.Name, StatusValue = x.Statuses.FirstOrDefault().Value, LastUpdate = x.LogDateTime }).ToList();
                    return devices;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public bool AddOrUpdateDevice(string name, int deviceId, int typeId, string userId)
        {
            try
            {
                using (var context = GetDataContext())
                {

                    var item = context.Devices.FirstOrDefault(it => it.Id == deviceId);
                    if (item == null)
                    {
                        var newDevice = new Device() { Name = name, TypeId = typeId, IsDeleted = false };
                        context.Devices.Add(newDevice);
                    }
                    else
                    {
                        item.Name = name;
                        item.TypeId = typeId;
                    }

                    context.SaveChanges();
                    var newItem = context.Devices.FirstOrDefault(it => it.Name == name && it.TypeId == typeId);

                    var userDevice = new UserDevice() { DeviceId = newItem.Id, UserId = userId };
                    context.UserDevices.Add(userDevice);
                    UpdateDeviceStatus(new ControllerStatusViewModel()
                    {
                        DeviceId = newItem.Id,
                        SystemDateTime = DateTime.Now,
                        TypeId = 1,
                        Value = 0
                    });

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return false;
            }
        }

        public bool DeleteDevice(int deviceId)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    var item = context.Devices.Where(it => it.Id == deviceId).FirstOrDefault();
                    if (item == null)
                    {
                        return false;
                    }
                    else
                    {
                        item.IsDeleted = true;
                    }

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return false;
            }
        }

        public bool UpdateDeviceStatus(ControllerStatusViewModel receivedItem)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var log = context.Logs.FirstOrDefault(it => it.DeviceId == receivedItem.DeviceId);
                    if (log == null)
                    {
                        log = CreateLog(receivedItem.DeviceId, receivedItem.SystemDateTime);
                        log.IsSended = true;
                        log.LogDateTime = DateTime.Now;
                        log.SystemDateTime = receivedItem.SystemDateTime;
                        context.Logs.Add(log);
                    }
                    else
                    {
                        log.IsSended = true;
                        log.LogDateTime = DateTime.Now;
                        log.SystemDateTime = receivedItem.SystemDateTime;
                    }
                    context.SaveChanges();
                    var status = context.Statuses.FirstOrDefault(it => it.LogId == log.Id && it.TypeId == receivedItem.TypeId);
                    if (status == null)
                    {
                        status = CreateStatus(log.Id, receivedItem.TypeId, receivedItem.Value);
                        //setting IsSended on Log to send email notifications - only if staatus is change from working to not working
                        if (status.Value.Equals(0))
                        {
                            log.IsSended = false;
                        }
                        context.Statuses.Add(status);

                    }
                    else
                    {
                        if (status.Value.Equals(1) && receivedItem.Value.Equals(0))
                        {
                            log.IsSended = false;
                        }
                        status.Value = receivedItem.Value;

                    }
                    context.SaveChanges();

                    var logH = AutoMapper.Mapper.Map<LogHistory>(log);
                    context.LogHistories.Add(logH);
                    context.SaveChanges();
                    logH.LogDateTime = DateTime.Now;
                    logH.SystemDateTime = receivedItem.SystemDateTime;

                    var historyStatus = AutoMapper.Mapper.Map<StatusHistory>(status);
                    historyStatus.LogHistoryId = logH.Id;
                    context.StatusHistories.Add(historyStatus);
                    status.Value = receivedItem.Value;

                    context.SaveChanges();
                    return true;
                }
            }

            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return false;
            }
        }

        private Log CreateLog(int deviceId, DateTime systemDateTime)
        {
            var newLog = new Log();
            newLog.DeviceId = deviceId;
            newLog.SystemDateTime = systemDateTime;
            newLog.LogDateTime = DateTime.Now;
            newLog.IsDeleted = false;
            return newLog;
        }

        private Status CreateStatus(int logId, int typeId, int value)
        {
            var newStatus = new Status();
            newStatus.LogId = logId;
            newStatus.TypeId = typeId;
            newStatus.Value = value;
            return newStatus;
        }

        public bool UpdateStatuses(List<ControllerStatusViewModel> receivedStatuses)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    foreach (var receivedItem in receivedStatuses)
                    {
                        var log = context.Logs.FirstOrDefault(it => it.DeviceId == receivedItem.DeviceId);
                        if (log == null)
                        {
                            log = CreateLog(receivedItem.DeviceId, receivedItem.SystemDateTime);
                            context.Logs.Add(log);
                        }

                        log.IsSended = true;
                        log.LogDateTime = DateTime.Now;
                        log.SystemDateTime = receivedItem.SystemDateTime;
                        context.SaveChanges();

                        var status = context.Statuses.FirstOrDefault(it => it.LogId == log.Id && it.TypeId == receivedItem.TypeId);
                        if (status == null)
                        {
                            status = CreateStatus(log.Id, receivedItem.TypeId, receivedItem.Value);
                            if (status.Value.Equals(0))
                            {
                                log.IsSended = false;
                            }

                            context.Statuses.Add(status);
                        }
                        else
                        {
                            if (status.Value.Equals(1) && receivedItem.Value.Equals(0))
                            {
                                log.IsSended = false;
                            }

                            status.Value = receivedItem.Value;
                        }

                        context.SaveChanges();
                        // log exist so we need to check if there is a status with this. typeId, then save status and log in log/status history and then update status 

                        var logH = AutoMapper.Mapper.Map<LogHistory>(log);
                        context.LogHistories.Add(logH);
                        context.SaveChanges();

                        logH.LogDateTime = DateTime.Now;
                        logH.SystemDateTime = receivedItem.SystemDateTime;
                        var historyStatus = AutoMapper.Mapper.Map<StatusHistory>(status);
                        historyStatus.LogHistoryId = logH.Id;
                        context.StatusHistories.Add(historyStatus);
                        status.Value = receivedItem.Value;
                        context.SaveChanges();
                    }
                    return true;
                }
            }

            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return false;
            }
        }

        public List<DeviceViewModel> GetAllDevices()
        {
            var result = new List<DeviceViewModel>();
            try
            {

                using (var context = GetDataContext())
                {
                    var items = context.Devices;
                    result = AutoMapper.Mapper.Map<List<DeviceViewModel>>(items);
                }
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        public UserStatusesViewModel GetYesterdayLogsStatistics(string userId)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var result = context.Database.SqlQuery<UserStatusesViewModel>(
                         @"SELECT count(query.ID) NumberOfDevices, ISNULL( SUM(CASE WHEN query.errors > 0 THEN 1 ELSE 0 END), 0) NumberOFErrors
                            FROM (select d.Id, count(sh.Id) as errors
                            FROM Devices d
                            JOIN UserDevices ud on ud.DeviceId=d.Id and ud.UserId='" + userId + @"'
                            LEFT JOIN LogHistories lh on lh.DeviceId=d.Id AND lh.LogDateTime >= DATEADD(day,-1, cast(GETDATE() as date))
                            LEFT JOIN StatusHistories sh on sh.LogHistoryId=lh.Id and sh.TypeId=1 and sh.Value=0
                            GROUP BY d.Id) query"
                         ).FirstOrDefault();
                    if (result == null)
                    {
                        Console.WriteLine("GetYesterdayLogsStatistics = NULL");
                        return new UserStatusesViewModel();
                    }

                    result.NumberOfWorkingDevices = result.NumberOfDevices - result.NumberOfErrors;
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public UserStatusesViewModel GetDailyLogsStatistics(string userId)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var result = context.Database.SqlQuery<UserStatusesViewModel>(
                         @"SELECT Count(S.TypeId) NumberOfDevices, SUM(CASE WHEN S.Value = 0 THEN 1 ELSE 0 END) NumberOfErrors
                            FROM Status S
                            JOIN Logs L ON S.LogId = L.Id
                            JOIN Devices D ON L.DeviceId = D.Id
                            JOIN UserDevices UD ON D.Id = UD.DeviceId
                            JOIN AspNetUsers U ON UD.UserId = U.Id
                            WHERE U.Id = '" + userId + @"' GROUP BY U.Id"
                         ).ToList().FirstOrDefault();

                    if (result == null)
                    {
                        Console.WriteLine("GetDailyLogsStatistics = NULL");
                        return new UserStatusesViewModel();
                    }

                    result.NumberOfWorkingDevices = result.NumberOfDevices - result.NumberOfErrors;
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public UserStatusesViewModel GetWeekLogsStatistics(string userId)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var result = context.Database.SqlQuery<UserStatusesViewModel>(
                         @"SELECT count(query.ID) NumberOfDevices, ISNULL( SUM(CASE WHEN query.errors > 0 THEN 1 ELSE 0 END), 0) NumberOFErrors
                            FROM (select d.Id, count(sh.Id) as errors
                            FROM Devices d
                            JOIN UserDevices ud on ud.DeviceId=d.Id and ud.UserId='" + userId + @"'
                            LEFT JOIN LogHistories lh on lh.DeviceId=d.Id AND lh.LogDateTime >= DATEADD(day,-7, cast(GETDATE() as date))
                            LEFT JOIN StatusHistories sh on sh.LogHistoryId=lh.Id and sh.TypeId=1 and sh.Value=0
                            GROUP BY d.Id) query"
                         ).FirstOrDefault();
                    if (result == null)
                    {
                        Console.WriteLine("GetWeekLogsStatistics = NULL");
                        return new UserStatusesViewModel();
                    }

                    result.NumberOfWorkingDevices = result.NumberOfDevices - result.NumberOfErrors;
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
