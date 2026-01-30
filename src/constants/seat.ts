// Seat Grid Configuration
export const GRID_ROWS = ["A", "B", "C", "D"] as const;
export const GRID_COLS = [1, 2, 3, 4, 5, 6] as const;
export const TOTAL_SEATS = GRID_ROWS.length * GRID_COLS.length; // 24

// Seat Type Distribution
export const SEAT_TYPE_CONFIG = {
  chair: { count: 10, cols: [1, 2, 3, 4, 5, 6] },
  table: { count: 8, cols: [1, 2, 3, 4] },
  cubicle: { count: 6, cols: [5, 6] },
} as const;

// Color Mappings for Seat Status
export const SEAT_COLOR_MAP = {
  available: {
    bg: "bg-green-500",
    shadow: "shadow-green-500/30",
    label: "Available",
    description: "Ready to book",
  },
  warning: {
    bg: "bg-orange-500",
    shadow: "shadow-orange-500/30",
    label: "Expiring Soon",
    description: "10 mins or less remaining",
  },
  occupied: {
    bg: "bg-red-500",
    shadow: "shadow-red-500/30",
    label: "Occupied",
    description: "More than 10 mins remaining",
  },
} as const;

// Expiration & Notification Thresholds
export const EXPIRATION_CONFIG = {
  WARNING_THRESHOLD_MINUTES: 10, // Show orange when ≤10 mins
  ALERT_THRESHOLD_SECONDS: 60, // Show toast when ≤60 seconds
  CRITICAL_THRESHOLD_SECONDS: 30, // Red alert when ≤30 seconds
  CHECK_INTERVAL_MS: 5000, // Check every 5 seconds (demo mode)
  // For production, change to: 30000 (check every 30 seconds)
} as const;

// Pricing Configuration
export const PRICING = {
  3: 300, // 3 hours = ₱300
  6: 550, // 6 hours = ₱550
  8: 700, // 8 hours = ₱700
  extra: 60, // ₱60 per additional hour
} as const;

// Dummy Bookings for Demo Mode
export const DUMMY_BOOKINGS = [
  { seatId: "A3", minutesAgo: 2, durationMinutes: 3 },
  { seatId: "B2", minutesAgo: 1, durationMinutes: 2 },
  { seatId: "C6", minutesAgo: 0.5, durationMinutes: 1 },
  { seatId: "D4", minutesAgo: 0.17, durationMinutes: 1.5 },
] as const;
