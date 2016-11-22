using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TempCloud.DataModel.Models;
using TempCloud.Infrastructure.Enums;
using TempCloud.ViewModel;
using UnconstrainedMelody;

namespace TempCloud.Service.Mappings
{
    public class Mappings
    {
        public Mappings()
        {
            Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Status, StatusViewModel>()
                   .ForMember(x => x.TextValue, y => y.MapFrom(z => ((StatusEnum)z.Value).GetDescription()));

                    cfg.CreateMap<Log, LogViewModel>()
                        .ForMember(x => x.DeviceName, y => y.MapFrom(z => z.Device.Name))
                        .ForMember(x => x.DeviceType, y => y.MapFrom(z => z.Device.TypeId))
                        .ForMember(x => x.DeviceTypeName, y => y.MapFrom(z => z.Device.Type.Name));

                    cfg.CreateMap<DeviceDetail, DeviceDetailViewModel>()
                        .ForMember(x => x.Name, y => y.MapFrom(z => z.DetailType.Name))
                        .ForMember(x => x.Value, y => y.MapFrom(z => z.Value));

                    cfg.CreateMap<Device, DeviceViewModel>()
                        .ForMember(x => x.TypeName, y => y.MapFrom(z => z.Type.Name))
                        .ForMember(x => x.DeviceDetails,
                            y => y.MapFrom(z => z.Details.Select(d => new DeviceDetailViewModel() { Name = d.DetailType.Name, Value = d.Value })));
                });
        }
    }
}
