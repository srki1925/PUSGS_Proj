using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebApp.Models.Enums;
using WebApp.Models.Users;

namespace WebApp.Models
{
    public class TIcket
    {
        public TIcket()
        {
           
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public decimal Cena { get; set; }
        public DateTime VaziOd { get; set; }
        public DateTime VaziDo { get; set; }
        public TicketType TicketType { get; set; }
        [ForeignKey("Korisnik")]
        public int? Korisnik_Id { get; set; } // korisnik moze da kupi 0 * karata a karta pripada 0 1 => korisnik id se nalazi u karti
        public Korisnik Korisnik { get; set; }
        public bool Active { get; set; }
        public string Email { get; set; }
    }
}