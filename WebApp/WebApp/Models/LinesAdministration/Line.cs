﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Models.Enums;

namespace WebApp.Models
{
	public class Line : VersionedItem
	{
		public Line()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public string Name { get; set; }

		public LineType LineType { get; set; }

		public List<OrderedBusStation> Stations { get; set; }

		public bool Active { get; set; } = true;
	}
}