using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Red_Voznje
    {
        public Red_Voznje()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Linija")]
        public int? Linija_Id { get; set; }
        public Linija Linija { get; set; }
        public DateTime Datum { get; set; }
        //sad kako polaske da uradimo treba odakle i kamo tj kada krece u kom smeru
    }
}