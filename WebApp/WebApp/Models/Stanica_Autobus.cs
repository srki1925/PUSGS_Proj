using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Stanica_Autobus
    {
        public Stanica_Autobus()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Stanica")]
        public int? Stanica_Id { get; set; }
        public Stanica Stanica { get; set; }
        [ForeignKey("Autobus")]
        public int? Autobus_Id { get; set; }
        public Autobus Autobus { get; set; }
    }
}