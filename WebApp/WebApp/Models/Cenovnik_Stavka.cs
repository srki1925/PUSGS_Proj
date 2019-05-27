using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    //cenovnik moze da ima  0 * stavki i stavka moze da pripada  0 * cenovnika mada ovo ne razumem zasto pa cu pitati sutra
    public class Cenovnik_Stavka
    {
        public Cenovnik_Stavka()
        {

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Cenovnik")]
        public int? Cenovnik_Id { get; set; }
        public Cenovnik Cenovnik { get; set; }
        [ForeignKey("Stavka")]
        public int? Stavka_Id { get; set; }
        public Stavka Stavka { get; set; }
    }
}