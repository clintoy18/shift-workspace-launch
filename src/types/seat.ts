export type SeatStatus = "available" | "warning" | "occupied";
export type SeatType = "chair" | "table" | "cubicle";

export interface SeatBooking {
  seatId: string;
  bookingTime: number;
  durationMinutes: number;
  notified: boolean;
}

export interface ExpiringAlert {
  seatId: string;
  timeRemaining: number;
  severity: "critical" | "warning";
  totalDuration: number;
}

export interface DummyBooking {
  seatId: string;
  minutesAgo: number;
  durationMinutes: number;
}
