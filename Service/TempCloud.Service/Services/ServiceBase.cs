using TempCloud.DataModel.Context;

namespace TempCloud.Service.Services
{
    public class ServiceBase
    {
        private CloudContext context = null;

        protected CloudContext GetDataContext()
        {
            context = new CloudContext();
            return context;
        }

        protected CloudContext LastDataContext()
        {
            if (context == null)
            {
                return GetDataContext();
            }

            return context;
        }
    }
}
