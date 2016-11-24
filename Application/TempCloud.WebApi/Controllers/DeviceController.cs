using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using TempCloud.Service.Interfaces;
using TempCloud.ViewModel;

namespace TempCloud.WebApi.Controllers
{
    public class DeviceController
    {
        [RoutePrefix("device")]
        public class CRFIController : ApiController
        {
            private readonly IDeviceService service;

            public CRFIController(IDeviceService deviceService)
            {
                this.service = deviceService;
            }

            [HttpPost]
            [Route("updateStatus")]
            public IHttpActionResult GetStatus([FromBody] ControllerStatusViewModel model)
            {
                var result = this.service.UpdateDeviceStatus(model);
                if (result == true)
                {
                    return Ok();
                }
                else
                {
                    return InternalServerError();
                }
            }

            [HttpPost]
            [Route("updateStatusList")]
            public IHttpActionResult GetListOfStatuses([FromBody] List<ControllerStatusViewModel> model)
            {
                var result = this.service.UpdateStatuses(model);
                if (result == true)
                {
                    return Ok();
                }
                else
                {
                    return InternalServerError();
                }
            }
        }
    }
}