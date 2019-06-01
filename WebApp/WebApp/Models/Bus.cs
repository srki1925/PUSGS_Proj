using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Autobus
    {

        public Autobus()
        {

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Naziv { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        [ForeignKey("Linija")]
        public int? Linija_Id { get; set; }
        public Line Linija { get; set; }
        public bool Active { get; set; }
    }
}