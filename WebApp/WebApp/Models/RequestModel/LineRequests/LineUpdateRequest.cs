﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models.RequestModel.LineRequests
{
    public class LineUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public LineType LineType { get; set; }
    }
}