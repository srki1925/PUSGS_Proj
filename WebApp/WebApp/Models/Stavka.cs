using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    //cenovnik se sastoji od stavki
    public class Stavka
    {

        public Stavka()
        {
            Vremenska.TicketType = Enums.TicketType.Vremenska;
            Dnevna.TicketType = Enums.TicketType.Dnevna;
            Mesecna.TicketType = Enums.TicketType.Mesecna;
            Godisnja.TicketType = Enums.TicketType.Godisnja;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Vremenska")]
        public int? Vremeska_Id { get; set; }
        public Karta Vremenska { get; set; }
        [ForeignKey("Dnevna")]
        public int? Dnevna_Id { get; set; }
        public Karta Dnevna { get; set; }
        [ForeignKey("Mesecna")]
        public int? Mesecna_Id { get; set; }
        public Karta Mesecna { get; set; }
        [ForeignKey("Godisnja")]
        public int? Godisnja_Id { get; set; }
        public Karta Godisnja { get; set; }
        public bool Active { get; set; }
    }
}