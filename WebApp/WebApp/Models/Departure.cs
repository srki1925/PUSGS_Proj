using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Departure
    {
        public Departure()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Time { get; set; }
        public DayType DayType { get; set; }
        [ForeignKey("Linija")]
        public int? Linija_Id { get; set; }
        public Line Linija { get; set; }
        public bool Active { get; set; }
    }
}