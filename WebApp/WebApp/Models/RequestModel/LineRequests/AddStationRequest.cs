﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.RequestModel.LineRequests
{
    public class AddStationRequest
    {
        public int LineId { get; set; }
        public int StationId { get; set; }
    }
}