using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models.RequestModel.ScheduleRequest
{
    public class ScheduleRequestModel
    {
        public DayType DayType { get; set; }
        public int LineId { get; set; }

    }
}