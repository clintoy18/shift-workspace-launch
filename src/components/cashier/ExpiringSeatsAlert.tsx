import { ExpiringAlert } from "@/types/seat";
import { AlertCircle, Clock } from "lucide-react";

interface ExpiringSeatsAlertProps {
  seats: ExpiringAlert[];
}

/**
 * Alert banner showing all seats expiring within the next minute
 * Displays persistently at top of dashboard for immediate visibility
 */
export const ExpiringSeatsAlert: React.FC<ExpiringSeatsAlertProps> = ({
  seats,
}) => {
  if (seats.length === 0) return null;

  return (
    <div className="mb-6 p-4 rounded-lg border-2 bg-amber-50 border-amber-400 shadow-md animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <AlertCircle className="h-6 w-6 text-red-600 animate-bounce" />
        <h3 className="text-lg font-bold text-red-700">
          ⏰ URGENT: {seats.length} Seat{seats.length !== 1 ? "s" : ""} Expiring
          Soon!
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {seats.map((seat) => (
          <div
            key={seat.seatId}
            className={`px-3 py-2 rounded-md text-sm font-semibold text-white flex items-center gap-2 ${
              seat.severity === "critical"
                ? "bg-red-600 animate-pulse"
                : "bg-orange-500"
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>{seat.seatId}</span>
            <span className="ml-1 font-mono">{seat.timeRemaining}s</span>
          </div>
        ))}
      </div>
    </div>
  );
};
