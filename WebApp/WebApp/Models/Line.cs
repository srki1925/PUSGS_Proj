using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using WebApp.Models.Enums;

namespace WebApp.Models
{

    public class Linija
    {
        public Linija()
        {

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        public string Name { get; set; }
        public LineType LineType { get; set; }
        public bool Active { get; set; }
    }
}