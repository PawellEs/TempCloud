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
                    var devices = context.Devices.Select(x => x.DeviceUsers.Where(y => y.UserId == userId));
                    var result = AutoMapper.Mapper.Map<List<DeviceViewModel>>(devices);
                    return result;
                }
            }
            catch (Exception ex)
            {
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

        public bool AddOrUpdateDevice(string name, int deviceId, int typeId)
        {
            try
            {
                using (var context = GetDataContext())
                {

                    var item = context.Devices.FirstOrDefault(it => it.Id == deviceId );
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

        public bool UpdateDeviceStatus(ControllerStatusViewModel crfiStatusItem)
        {
            throw new NotImplementedException();
        }

        public bool UpdateStatuses(List<ControllerStatusViewModel> crfiStatuses)
        {
            throw new NotImplementedException();
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
    }
}
