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
    public class WebController : ApiController
    {
        private readonly IDeviceService service;

        public WebController(IDeviceService deviceService)
        {
            this.service = deviceService;
        }

        [Route("getDevices")]
        public IHttpActionResult GetDevices()
        {
            string userId = HttpContext.Current.User.Identity.GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return NotFound();
            }

            var userDevices = this.service.GetUserDevice(userId);
            return Ok(userDevices);
        }

        [Route("getAllDevices")]
        public IHttpActionResult GetAllDevices()
        {
            if (!HttpContext.Current.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }


            var userDevices = this.service.GetAllDevices();
            return Ok(userDevices);
        }

        [Route("getDevicesStatus/{typeId}")]
        public IHttpActionResult GetDevicesByType(int typeId)
        {
            string userId = HttpContext.Current.User.Identity.GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return NotFound();
            }
            var devicesByType = this.service.GetDevicesByType(typeId, userId);

            return Ok(devicesByType);
        }

        [Route("GetDevicesByPage/{page}/{itemsNumber}")]
        public IHttpActionResult GetDevicesByPage(int page, int itemsNumber)
        {
            var result = this.service.GetDevicesByPage(page, itemsNumber);
            return Ok(result);
        }

        [HttpPost]
        [Route("AddOrUpdateDevice")]
        public IHttpActionResult AddOrUpdateDevice(DeviceFormViewModel model)
        {
            if (!HttpContext.Current.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            var result = this.service.AddOrUpdateDevice(model.Name, model.DeviceId, model.TypeId);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("GetDevice/{deviceId}")]
        public IHttpActionResult GetDevice(int deviceId)
        {
            if (!HttpContext.Current.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            var result = this.service.GetDeviceById(deviceId);

            return Ok(result);
        }

        [HttpDelete]
        [Route("DeleteDevice/{deviceId}")]
        public IHttpActionResult DeleteDevice(int deviceId)
        {
            if (!HttpContext.Current.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            var result = this.service.DeleteDevice(deviceId);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}