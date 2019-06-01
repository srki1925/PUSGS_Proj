using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Red_Voznje_Linije
    {
        public Red_Voznje_Linije()
        {

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Red_Voznje")]
        public int? Red_Voznje_Id { get; set; }
        public Red_Voznje Red_Voznje { get; set; }
        [ForeignKey("Linija")]
        public int? Linija_Id { get; set; }
        public Line Linija { get; set; }
    }
}