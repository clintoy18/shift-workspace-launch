import { useState, useEffect, useCallback } from "react";
import { SeatBooking, ExpiringAlert } from "@/types/seat";
import { getExpiringSeats, getOccupiedSeats } from "@/utils/seatHelpers";
import { EXPIRATION_CONFIG } from "@/constants/seat";
import { toast } from "sonner";

/**
 * Hook to manage seat bookings and expiration notifications
 * Handles:
 * - Seat occupancy state
 * - Booking lifecycle tracking
 * - Automatic expiration detection and notification
 * - Real-time updates
 *
 * @param initialBookings - Initial map of seat bookings
 * @returns Object with booking state and control methods
 */
export const useSeatBookings = (initialBookings: Map<string, SeatBooking>) => {
  const [seatBookings, setSeatBookings] = useState<Map<string, SeatBooking>>(
    initialBookings
  );
  const [occupied, setOccupied] = useState<Set<string>>(
    getOccupiedSeats(initialBookings)
  );

  // Monitor bookings and trigger notifications/cleanup for expired seats
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedBookings = new Map(seatBookings);
      let hasNewNotifications = false;

      updatedBookings.forEach((booking) => {
        const expiryTime =
          booking.bookingTime + booking.durationMinutes * 60 * 1000;
        const timeUntilExpiry = (expiryTime - now) / 60000; // Convert to minutes

        // Alert when expiring within threshold and not yet notified
        if (
          timeUntilExpiry > 0 &&
          timeUntilExpiry <= 1 &&
          !booking.notified
        ) {
          const seconds = Math.ceil(timeUntilExpiry * 60);
          toast.error(`⏰ Seat ${booking.seatId} expiring in ${seconds}s!`, {
            duration: 8000,
            position: "top-center",
            description: "Customer needs to renew or check out immediately",
          });
          booking.notified = true;
          hasNewNotifications = true;
        }

        // Auto-remove expired seat and notify
        if (timeUntilExpiry <= 0) {
          setOccupied((prev) => {
            const newSet = new Set(prev);
            newSet.delete(booking.seatId);
            return newSet;
          });
          updatedBookings.delete(booking.seatId);
          toast.success(`✓ Seat ${booking.seatId} freed`, {
            duration: 5000,
            position: "top-center",
            description: "Seat is now available for booking",
          });
        }
      });

      if (hasNewNotifications) {
        setSeatBookings(updatedBookings);
      }
    }, EXPIRATION_CONFIG.CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [seatBookings]);

  /**
   * Add a new booking for a seat
   * @param seatId - Seat to book
   * @param durationMinutes - Duration of booking in minutes
   */
  const addBooking = useCallback((seatId: string, durationMinutes: number) => {
    const newBooking: SeatBooking = {
      seatId,
      bookingTime: Date.now(),
      durationMinutes,
      notified: false,
    };
    setSeatBookings((prev) => new Map(prev).set(seatId, newBooking));
    setOccupied((prev) => new Set(prev).add(seatId));
  }, []);

  /**
   * Remove a booking for a seat
   * @param seatId - Seat to free up
   */
  const removeBooking = useCallback((seatId: string) => {
    setSeatBookings((prev) => {
      const updated = new Map(prev);
      updated.delete(seatId);
      return updated;
    });
    setOccupied((prev) => {
      const updated = new Set(prev);
      updated.delete(seatId);
      return updated;
    });
  }, []);

  /**
   * Get list of seats expiring soon
   * @returns Array of expiring alerts sorted by urgency
   */
  const getExpiringAlerts = useCallback((): ExpiringAlert[] => {
    return getExpiringSeats(seatBookings);
  }, [seatBookings]);

  return {
    seatBookings,
    occupied,
    addBooking,
    removeBooking,
    getExpiringAlerts,
    setSeatBookings,
    setOccupied,
  };
};
