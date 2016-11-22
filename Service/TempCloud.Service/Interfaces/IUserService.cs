using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TempCloud.ViewModel;

namespace TempCloud.Service.Interfaces
{
    public interface IUserService
    {
        List<NotifyEmailViewModel> GetNotifyEmailsByDeviceId(int systemId);

        bool AddOrUpdateNotifyEmail(NotifyEmailViewModel model, string userId);

        bool AddOrUpdateNotifyEmailByAdmin(NotifyEmailViewModel model);

        bool DeleteNotification(NotifyEmailViewModel model, string userId);

        bool DeleteNotificationByAdmin(NotifyEmailViewModel model);

        List<UserDataViewModel> GetAllUsers(string userId, string searchString = "");

        List<UserDataViewModel> GetUsersByRole(string role);

        UserDataViewModel GetUser(string userId);

        bool EditUser(UserDataViewModel user);
        bool EditSettings(UserDataViewModel model);

        void DeleteUser(string userId);

        List<UserDataViewModel> GetUserByPage(string userId, int page = 1, int itemsNumber = 10);

        bool SetRole(string userId, string role);

        void AssignDevicesToUser(string userId, List<int> systems);
    }
}
