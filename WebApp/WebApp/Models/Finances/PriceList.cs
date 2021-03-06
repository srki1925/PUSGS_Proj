﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
	public class PriceList : VersionedItem
	{
		public PriceList()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public DateTime From { get; set; }

		public DateTime To { get; set; }

		public bool Active { get; set; }

		public List<PriceListItem> PriceListItems { get; set; }
	}
}