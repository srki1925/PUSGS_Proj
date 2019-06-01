using System;
using System.Runtime.CompilerServices;

namespace WebApp.Models
{
	/// <summary>
	/// Extension methods for <see cref="DateTime" /> structure.
	/// </summary>
	internal static class DateTimeExtensions
	{
		/// <summary>
		/// Rounds date time value to hour.
		/// </summary>
		/// <param name="dt">The <see cref="DateTime" /> instance to round.</param>
		/// <param name="kind">The <see cref="DateTimeKind" />.</param>
		/// <returns>Rounded <see cref="DateTime" /> instance.</returns>
		[MethodImpl(MethodImplOptions.AggressiveInlining)]
		public static DateTime RoundToHour(this DateTime dt, DateTimeKind? kind = null)
		{
			return new DateTime(dt.Ticks - (dt.Ticks % TimeSpan.TicksPerHour), kind ?? dt.Kind);
		}

		/// <summary>
		/// Rounds date time value to day.
		/// </summary>
		/// <param name="dt">The <see cref="DateTime" /> instance to round.</param>
		/// <param name="kind">The <see cref="DateTimeKind" />.</param>
		/// <returns>Rounded <see cref="DateTime" /> instance.</returns>
		[MethodImpl(MethodImplOptions.AggressiveInlining)]
		public static DateTime AddRoundedDay(this DateTime dt, DateTimeKind? kind = null)
		{
			dt = dt.AddDays(1);
			return new DateTime(dt.Ticks - (dt.Ticks % TimeSpan.TicksPerDay), kind ?? dt.Kind);
		}

		/// <summary>
		/// Adds one month rounded..
		/// </summary>
		/// <param name="dt">The <see cref="DateTime" /> instance to round.</param>
		/// <param name="kind">The <see cref="DateTimeKind" />.</param>
		/// <returns>Rounded <see cref="DateTime" /> instance.</returns>
		[MethodImpl(MethodImplOptions.AggressiveInlining)]
		public static DateTime AddRoundedMonth(this DateTime dt)
		{
			var isLastMonth = dt.Month == 12;
			return new DateTime(!isLastMonth ? dt.Year : dt.Year + 1, !isLastMonth ? dt.Month + 1 : 1, 1);
		}

		/// <summary>
		/// Adds one year rounded.
		/// </summary>
		/// <param name="dt">The <see cref="DateTime" /> instance to round.</param>
		/// <param name="kind">The <see cref="DateTimeKind" />.</param>
		/// <returns>Rounded <see cref="DateTime" /> instance.</returns>
		[MethodImpl(MethodImplOptions.AggressiveInlining)]
		public static DateTime AddRoundedYear(this DateTime dt)
		{
			var isLastMonth = dt.Month == 12;
			return new DateTime(!isLastMonth ? dt.Year : dt.Year + 1, 1, 1);
		}
	}
}