using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Linija_Stanica
    {
        public Linija_Stanica()
        {

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Linija")]
        public int? Linija_Id { get; set; }
        public Line Linija { get; set; }
        [ForeignKey("Stanica")]
        public int? Stanica_Id { get; set; }
        public Stanica Stanica { get; set; }
    }
}