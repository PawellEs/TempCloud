using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using TempCloud.Service.Interfaces;

namespace TempCloud.WebApi.Controllers
{
    public class WebController : ApiController
    {
        private readonly IDeviceService deviceService;

        public WebController(IDeviceService deviceService)
        {
            this.deviceService = deviceService;
        }

        [Route("getDevicesStatus/{choosenDeviceId}")]
        public IHttpActionResult GetDevicesStatus(string choosenDeviceId)
        {
            int deviceId;
            if (!int.TryParse(choosenDeviceId, out deviceId))
            {
                return NotFound();
            }
            //var systemDevices = this.deviceService.GetSystemDevices(systemId);

            return Ok();
        }
    }
}