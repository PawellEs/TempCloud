using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using TempCloud.Service.Mappings;
using System.Web.Http;
using Elmah.Contrib.WebApi;

[assembly: OwinStartup(typeof(TempCloud.WebApi.Startup))]

namespace TempCloud.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
            GlobalConfiguration.Configuration.Filters.Add(new ElmahHandleErrorApiAttribute());
            ConfigureOAuthTokenGeneration(app);
            ConfigureOAuthTokenConsumption(app);
            new Mappings();
        }
    }
}
