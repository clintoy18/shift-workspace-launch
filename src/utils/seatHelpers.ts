import { SeatBooking, SeatStatus, ExpiringAlert } from "@/types/seat";
import { EXPIRATION_CONFIG } from "@/constants/seat";

/**
 * Determines the status of a seat based on occupancy and remaining time
 * Available → Warning (≤10 mins left) → Occupied (>10 mins left)
 *
 * @param seatId - The seat identifier (e.g., "A3", "B5")
 * @param occupied - Set of currently occupied seat IDs
 * @param seatBookings - Map of seat bookings with expiration info
 * @returns The current status of the seat
 */
export const getSeatStatus = (
  seatId: string,
  occupied: Set<string>,
  seatBookings: Map<string, SeatBooking>
): SeatStatus => {
  // Not occupied = available
  if (!occupied.has(seatId)) return "available";

  // No booking record = occupied (default)
  const booking = seatBookings.get(seatId);
  if (!booking) return "occupied";

  // Check time remaining
  const now = Date.now();
  const expiryTime = booking.bookingTime + booking.durationMinutes * 60 * 1000;
  const timeRemaining = (expiryTime - now) / 60000; // in minutes

  return timeRemaining <= EXPIRATION_CONFIG.WARNING_THRESHOLD_MINUTES
    ? "warning"
    : "occupied";
};

/**
 * Get all seats that are expiring soon (for alert banner)
 * Filters bookings that expire within ALERT_THRESHOLD_SECONDS
 *
 * @param seatBookings - Map of all seat bookings
 * @returns Sorted array of expiring alerts (soonest first)
 */
export const getExpiringSeats = (
  seatBookings: Map<string, SeatBooking>
): ExpiringAlert[] => {
  const now = Date.now();
  const expiring: ExpiringAlert[] = [];

  seatBookings.forEach((booking) => {
    const expiryTime = booking.bookingTime + booking.durationMinutes * 60 * 1000;
    const timeRemaining = (expiryTime - now) / 1000; // in seconds

    if (
      timeRemaining > 0 &&
      timeRemaining <= EXPIRATION_CONFIG.ALERT_THRESHOLD_SECONDS
    ) {
      const severity =
        timeRemaining <= EXPIRATION_CONFIG.CRITICAL_THRESHOLD_SECONDS
          ? "critical"
          : "warning";
      expiring.push({
        seatId: booking.seatId,
        timeRemaining: Math.ceil(timeRemaining),
        severity,
        totalDuration: booking.durationMinutes,
      });
    }
  });

  return expiring.sort((a, b) => a.timeRemaining - b.timeRemaining);
};

/**
 * Determines seat type based on column number
 * Chairs: cols 1-6 (10 total)
 * Tables: cols 1-4 (8 total)
 * Cubicles: cols 5-6 (6 total)
 *
 * @param seatId - Seat identifier like "A3"
 * @returns The type of seat
 */
export const getSeatType = (seatId: string): "chair" | "table" | "cubicle" => {
  const col = parseInt(seatId.slice(1), 10);
  if (col <= 4) return "chair";
  if (col === 5) return "table";
  return "cubicle";
};

/**
 * Initialize seat bookings from dummy data
 * TODO: Replace with API call when backend is available
 *
 * @param dummyData - Array of dummy booking data
 * @returns Map of seat bookings ready for use
 */
export const initializeDummyBookings = (
  dummyData: Array<{ seatId: string; minutesAgo: number; durationMinutes: number }>
): Map<string, SeatBooking> => {
  const bookings = new Map<string, SeatBooking>();

  dummyData.forEach(({ seatId, minutesAgo, durationMinutes }) => {
    bookings.set(seatId, {
      seatId,
      bookingTime: Date.now() - minutesAgo * 60 * 1000,
      durationMinutes,
      notified: false,
    });
  });

  return bookings;
};

/**
 * Calculate occupied seats from bookings
 * TODO: Can be replaced with direct API response when backend is available
 *
 * @param seatBookings - Map of seat bookings
 * @returns Set of currently occupied seat IDs
 */
export const getOccupiedSeats = (
  seatBookings: Map<string, SeatBooking>
): Set<string> => {
  return new Set(seatBookings.keys());
};
