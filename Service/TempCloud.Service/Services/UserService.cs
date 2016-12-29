using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using TempCloud.DataModel.Models;
using TempCloud.Service.Interfaces;
using TempCloud.ViewModel;

namespace TempCloud.Service.Services
{
    public class UserService : ServiceBase, IUserService
    {
        public List<NotifyEmailViewModel> GetNotifyEmailsByDeviceId(int deviceId)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    var model = context.NotifyEmails.Where(it => it.DeviceId == deviceId).ToList();
                    var result = AutoMapper.Mapper.Map<List<NotifyEmailViewModel>>(model);
                    return result;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public bool AddOrUpdateNotifyEmail(NotifyEmailViewModel model, string userId)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    var isUserDevice = context.UserDevices.Any(it => it.DeviceId == model.DeviceId && it.UserId == userId);
                    if (!isUserDevice)
                    {
                        return false;
                    }

                    var item = context.NotifyEmails.Where(it => it.Id == model.Id).FirstOrDefault();
                    if (item == null)
                    {
                        var newItem = AutoMapper.Mapper.Map<NotifyEmail>(model);
                        context.NotifyEmails.Add(newItem);
                    }
                    else
                    {
                        item.Email = model.Email;
                        item.DeviceId = model.DeviceId;
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

        public bool AddOrUpdateNotifyEmailByAdmin(NotifyEmailViewModel model)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    var item = context.NotifyEmails.Where(it => it.Id == model.Id).FirstOrDefault();
                    if (item == null)
                    {
                        var newItem = AutoMapper.Mapper.Map<NotifyEmail>(model);
                        context.NotifyEmails.Add(newItem);
                    }
                    else
                    {
                        item.Email = model.Email;
                        item.DeviceId = model.DeviceId;
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

        public bool DeleteNotification(NotifyEmailViewModel model, string userId)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    var isUserDevice = context.UserDevices.Any(it => it.DeviceId == model.DeviceId && it.UserId == userId);
                    if (!isUserDevice)
                    {
                        return false;
                    }

                    var item = AutoMapper.Mapper.Map<NotifyEmail>(model);
                    context.NotifyEmails.Remove(item);
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

        public bool DeleteNotificationByAdmin(NotifyEmailViewModel model)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    var item = AutoMapper.Mapper.Map<NotifyEmail>(model);
                    context.NotifyEmails.Remove(item);
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

        public List<UserDataViewModel> GetAllUsers(string userId, string searchString = "")
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var user = context.Users.FirstOrDefault(x => x.Id.Equals(userId));
                    var userRole = user.Roles.FirstOrDefault().RoleId;
                    var userDevices = context.UserDevices.Where(x => x.UserId.Equals(userId)).Select(x => x.DeviceId).ToList();
                    if (userRole.Equals("1"))
                    {
                        // List<ApplicationUser> users = new List<ApplicationUser>();
                        if (searchString == "")
                        {
                            var users = context.Users.Where(x => x.IsDeleted == false);
                            var result = AutoMapper.Mapper.Map<List<UserDataViewModel>>(users);
                            return result;
                        }
                        else
                        {
                            var users = context.Users.Where(it => (it.FirstName.Contains(searchString) || it.LastName.Contains(searchString) || it.Email.Contains(searchString)) && it.IsDeleted == false);
                            var result = AutoMapper.Mapper.Map<List<UserDataViewModel>>(users);
                            return result;
                        }

                    }
                    else if (userRole.Equals("2"))
                    {

                        if (searchString == "")
                        {
                            var users = context.Users.Include(x => x.UserDevices).Where(x => x.UserDevices.Any(y => userDevices.Contains(y.DeviceId)) && x.IsDeleted == false);
                            var result = AutoMapper.Mapper.Map<List<UserDataViewModel>>(users);
                            return result;
                        }
                        else
                        {
                            var users = context.Users.Include(x => x.UserDevices).Where(it => it.UserDevices.Any(y => userDevices.Contains(y.DeviceId)) && it.IsDeleted == false && (it.FirstName.Contains(searchString) || it.LastName.Contains(searchString) || it.Email.Contains(searchString)));
                            var result = AutoMapper.Mapper.Map<List<UserDataViewModel>>(users);
                            return result;
                        }

                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public List<UserDataViewModel> GetUsersByRole(string role)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    //var result = new List<UserDataViewModel>();
                    var roleStore = new RoleStore<IdentityRole>(context);
                    var roleManager = new RoleManager<IdentityRole>(roleStore);
                    var usersIds = roleManager.FindByName("Owner").Users.Select(x => x.UserId);

                    var users = context.Users.Where(x => usersIds.Contains(x.Id));
                    var result = AutoMapper.Mapper.Map<List<UserDataViewModel>>(users);
                    return result;
                }
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public UserDataViewModel GetUser(string userId)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var user = context.Users.Where(it => it.Id == userId).FirstOrDefault();
                    if (user == null)
                    {
                        return new UserDataViewModel();
                    }
                    var devices = context.UserDevices.Where(x => x.UserId.Equals(userId)).Select(dev => dev.DeviceId).ToList();
                    var result = AutoMapper.Mapper.Map<UserDataViewModel>(user);
                    result.AssignedDevices = devices;

                    var identityUserRole = user.Roles.FirstOrDefault();
                    if (identityUserRole != null)
                        result.Role = int.Parse(identityUserRole.RoleId);
                    return result;
                }
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public bool EditSettings(UserDataViewModel model)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var user = context.Users.FirstOrDefault(it => it.Id == model.Id);
                    if (user == null)
                    {
                        return false;
                    }

                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.NotificationActive = model.NotificationActive;
                    user.AlertInterval = model.AlertInterval;
                    context.SaveChanges();
                }
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
            return true;
        }

        public bool EditUser(UserDataViewModel model)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var user = context.Users.FirstOrDefault(it => it.Id == model.Id);
                    if (user == null)
                    {
                        return false;
                    }

                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.NotificationActive = model.NotificationActive;
                    user.AlertInterval = model.AlertInterval;
                    context.SaveChanges();

                    var devices = context.UserDevices.Where(x => x.UserId.Equals(model.Id)).ToList();
                    foreach (var item in devices)
                    {
                        if (!model.AssignedDevices.Contains(item.DeviceId))
                        {
                            context.UserDevices.Remove(item);
                        }
                    }
                    context.SaveChanges();
                    foreach (var item in model.AssignedDevices)
                    {
                        if (!devices.Any(x => x.DeviceId.Equals(item)))
                        {
                            context.UserDevices.Add(new UserDevice() { UserId = model.Id, DeviceId = item });
                        }
                    }
                    context.SaveChanges();
                    var userStore = new UserStore<ApplicationUser>(context);
                    var userManager = new UserManager<ApplicationUser>(userStore);
                    userManager.RemoveFromRoles(user.Id, new string[] { "Admin", "Owner" });
                    switch (model.Role)
                    {
                        case 1:
                            userManager.AddToRole(user.Id, "Admin");
                            break;
                        case 2:
                            userManager.AddToRole(user.Id, "Owner");
                            break;
                    }
                }
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
            return true;
        }

        public void AssignDevicesToUser(string userId, List<int> devices)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    foreach (var item in devices)
                    {
                        var newAssign = new UserDevice() { UserId = userId, DeviceId = item };
                        context.UserDevices.Add(newAssign);
                    }
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void DeleteUser(string userId)
        {
            using (var context = this.GetDataContext())
            {
                var user = context.Users.FirstOrDefault(it => it.Id == userId);
                if (user == null)
                {
                    return;
                }

                user.IsDeleted = true;
                user.Email += "-deleted";
                user.UserName += "-deleted";
                context.SaveChanges();
            }
        }

        public bool SetRole(string userId, string role)
        {
            try
            {
                using (var context = this.GetDataContext())
                {
                    var user = context.Users.FirstOrDefault(it => it.Id == userId);
                    if (user == null)
                    {
                        return false;
                    }

                    var userStore = new UserStore<ApplicationUser>(context);
                    var userManager = new UserManager<ApplicationUser>(userStore);
                    userManager.RemoveFromRoles(user.Id, new string[] { "Admin", "Owner" });
                    userManager.AddToRole(user.Id, role);
                }
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
                return false;
            }
            return true;
        }

        public List<UserDataViewModel> GetUserByPage(string userId, int page = 1, int itemsNumber = 10)
        {
            try
            {
                using (var context = GetDataContext())
                {
                    if (page == 0)
                    {
                        page = 1;
                    }

                    var user = context.Users.FirstOrDefault(x => x.Id.Equals(userId));
                    var userRole = user.Roles.FirstOrDefault().RoleId;
                    var userSystems = context.UserDevices.Where(x => x.UserId.Equals(userId)).Select(x => x.DeviceId).ToList();
                    List<ApplicationUser> users = new List<ApplicationUser>();

                    if (userRole.Equals("1"))
                    {
                        users = context.Users.Skip((page - 1) * itemsNumber).Take(itemsNumber).Where(x => x.IsDeleted == false).ToList();
                    }
                    else if (userRole.Equals("2"))
                    {
                        users = context.Users.Skip((page - 1) * itemsNumber).Take(itemsNumber).Where(x => x.UserDevices.Any(y => userSystems.Contains(y.DeviceId)) && x.IsDeleted == false).ToList();
                    }
                    else
                    {
                        return null;
                    }

                    var result = AutoMapper.Mapper.Map<List<UserDataViewModel>>(users);
                    return result;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }
    }
}
