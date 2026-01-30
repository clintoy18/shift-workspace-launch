import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, CreditCard, CheckCircle, XCircle, BarChart3, TrendingUp, Plus, Minus } from "lucide-react";
import { useState, useMemo } from "react";
import ServiceSelectionModal from "@/components/cashier/ServiceSelectionModal";
import ConfirmationModal from "@/components/cashier/ConfirmationModal";
import { ExpiringSeatsAlert } from "@/components/cashier/ExpiringSeatsAlert";
import { useSeatBookings } from "@/hooks/useSeatBookings";
import { getSeatStatus, getSeatType, initializeDummyBookings } from "@/utils/seatHelpers";
import { GRID_ROWS, GRID_COLS, PRICING, DUMMY_BOOKINGS, SEAT_COLOR_MAP } from "@/constants/seat";

const CashierDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Initialize booking system with dummy data
  const initialBookings = initializeDummyBookings(DUMMY_BOOKINGS as any);
  const { seatBookings, occupied, getExpiringAlerts } = useSeatBookings(initialBookings);

  // UI State
  const [zoom, setZoom] = useState(100);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(3);
  const [extraHours, setExtraHours] = useState<number>(0);
  const [bookingData, setBookingData] = useState<{
    seat: string;
    type: "chair" | "table" | "cubicle";
    duration: number;
    extraHours: number;
    total: number;
  } | null>(null);

  // Calculate total price from duration and extra hours
  const totalPrice = useMemo(() => {
    return PRICING[selectedDuration as keyof typeof PRICING] + extraHours * PRICING.extra;
  }, [selectedDuration, extraHours]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };



  const handleSeatClick = (seatId: string) => {
    setSelectedSeat(seatId);
    setShowServiceModal(true);
  };

  const handleConfirmFromService = () => {
    if (selectedSeat) {
      setBookingData({
        seat: selectedSeat,
        type: getSeatType(selectedSeat),
        duration: selectedDuration,
        extraHours,
        total: totalPrice,
      });
      setShowServiceModal(false);
      setShowConfirmationModal(true);
    }
  };

  const handleConfirmBooking = () => {
    if (bookingData) {
      setShowConfirmationModal(false);
      setSelectedSeat(null);
      setSelectedDuration(3);
      setExtraHours(0);
      setBookingData(null);
      // TODO: Call API to create booking when backend is available
    }
  };


  const handlePrintReceipt = () => {
    if (!bookingData) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Booking Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .receipt { max-width: 400px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 5px 0 0 0; color: #666; }
            .details { margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted #ccc; }
            .detail-label { color: #666; }
            .detail-value { font-weight: bold; }
            .total-row { display: flex; justify-content: space-between; padding: 12px 0; font-size: 18px; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>Shift</h1>
              <p>Workspace Booking Receipt</p>
            </div>
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Reference #:</span>
                <span class="detail-value">SHIFT${Date.now().toString().slice(-6)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Seat ID:</span>
                <span class="detail-value">${bookingData.seat}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Seat Type:</span>
                <span class="detail-value" style="text-transform: capitalize;">${bookingData.type}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Duration:</span>
                <span class="detail-value">${bookingData.duration + bookingData.extraHours} hours</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Booking Time:</span>
                <span class="detail-value">${new Date().toLocaleString()}</span>
              </div>
              <div class="total-row" style="border-top: 2px solid #333; border-bottom: none;">
                <span>Total Amount:</span>
                <span>₱${bookingData.total}</span>
              </div>
            </div>
            <div class="footer">
              <p>Thank you for choosing Shift!</p>
              <p style="margin-top: 10px;">This is your booking confirmation.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      printWindow.document.write(receiptHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const SeatIcon = ({ type }: { type: "chair" | "table" | "cubicle" }) => {
    const icons: Record<string, JSX.Element> = {
      chair: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 3h8v4H8zm-2 4h12v2H6zm1 3h10v8H7zm-1 9h12v1H6z" />
        </svg>
      ),
      table: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="2" y="4" width="20" height="12" rx="2" />
          <rect x="3" y="16" width="4" height="3" rx="1" />
          <rect x="17" y="16" width="4" height="3" rx="1" />
        </svg>
      ),
      cubicle: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 3h7v7H3zm0 9h7v7H3zm9-9h7v7h-7zm0 9h7v7h-7z" />
        </svg>
      ),
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cashier Portal</h1>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Expiring Seats Alert Banner */}
        <ExpiringSeatsAlert seats={getExpiringAlerts()} />

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Sales</p>
                <p className="text-3xl font-bold text-foreground">₱8,450</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-3xl font-bold text-foreground">34</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Transaction</p>
                <p className="text-3xl font-bold text-foreground">₱249</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircleIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Process Payment</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Handle customer seat booking payments
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              New Payment
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Refunds</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Process customer refund requests
            </p>
            <Button variant="outline" className="w-full">
              Handle Refund
            </Button>
          </Card>
        </div>

        {/* Seat Management Blueprint */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Manage Seats</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Click to toggle seat occupancy status
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(60, zoom - 10))}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Minus className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-sm text-muted-foreground w-12 text-center">
                {zoom}%
              </span>
              <button
                onClick={() => setZoom(Math.min(150, zoom + 10))}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Blueprint Grid */}
          <div className="bg-muted/30 border border-border rounded-lg p-6 overflow-x-auto">
            <div
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
              className="inline-block"
            >
              <div className="space-y-3 min-w-fit">
                {GRID_ROWS.map((row) => (
                  <div key={row} className="flex items-center gap-3">
                    <span className="w-6 font-bold text-foreground text-center text-sm">
                      {row}
                    </span>
                    <div className="flex gap-3">
                      {GRID_COLS.map((col) => {
                        const seatId = `${row}${col}`;
                        const status = getSeatStatus(seatId, occupied, seatBookings);
                        const type = getSeatType(seatId);
                        const isClickable = status === "available";
                        const colorConfig = SEAT_COLOR_MAP[status];

                        return (
                          <button
                            key={seatId}
                            onClick={() => isClickable && handleSeatClick(seatId)}
                            disabled={!isClickable}
                            className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all hover:scale-105 text-white shadow-lg ${
                              colorConfig.bg
                            } ${colorConfig.shadow} ${
                              isClickable ? "cursor-pointer" : "cursor-not-allowed"
                            } ${
                              status === "occupied" ? "opacity-60" : status === "warning" ? "opacity-75" : ""
                            }`}
                            title={`${seatId} - ${type}`}
                          >
                            <SeatIcon type={type} />
                            <span className="text-xs font-bold mt-0.5">{seatId}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend and Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground">Legend</h3>
              <div className="space-y-2">
                {Object.entries(SEAT_COLOR_MAP).map(([status, config]: [string, any]) => (
                  <div key={status} className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${config.bg} text-white flex items-center justify-center`}>
                      <SeatIcon type={status === "available" ? "chair" : status === "warning" ? "table" : "cubicle"} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{config.label}</p>
                      <p className="text-xs text-muted-foreground">{config.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground">Occupancy Summary</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Seats</span>
                  <span className="font-bold text-foreground">24</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Occupied</span>
                  <span className="font-bold text-red-600">{occupied.size}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <span className="font-bold text-green-600">{24 - occupied.size}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Methods Summary */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Payment Methods Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Cash</p>
              <p className="text-2xl font-bold text-foreground">₱3,200</p>
              <p className="text-xs text-muted-foreground mt-1">12 transactions</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Card</p>
              <p className="text-2xl font-bold text-foreground">₱5,150</p>
              <p className="text-xs text-muted-foreground mt-1">22 transactions</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Online</p>
              <p className="text-2xl font-bold text-foreground">₱100</p>
              <p className="text-xs text-muted-foreground mt-1">0 transactions</p>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {[
              {
                id: "TXN001",
                customer: "John Doe",
                seat: "A3 (Chair)",
                amount: "₱300",
                status: "completed",
              },
              {
                id: "TXN002",
                customer: "Jane Smith",
                seat: "B5 (Table)",
                amount: "₱550",
                status: "completed",
              },
              {
                id: "TXN003",
                customer: "Bob Johnson",
                seat: "C1 (Chair)",
                amount: "₱700",
                status: "pending",
              },
              {
                id: "TXN004",
                customer: "Alice Brown",
                seat: "D4 (Cubicle)",
                amount: "₱360",
                status: "completed",
              },
              {
                id: "TXN005",
                customer: "Charlie Wilson",
                seat: "B3 (Table)",
                amount: "₱550",
                status: "completed",
              },
            ].map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{txn.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {txn.seat} • {txn.id}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-foreground text-right min-w-fit">
                    {txn.amount}
                  </p>
                  <div className="flex items-center gap-2 min-w-fit">
                    {txn.status === "completed" ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-700">
                          Done
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-xs font-semibold text-orange-700">
                          Pending
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Seat Type Distribution */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Bookings by Seat Type
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 font-semibold mb-2">Chairs</p>
              <p className="text-3xl font-bold text-blue-600">14</p>
              <p className="text-xs text-blue-600 mt-2">58% of today</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 font-semibold mb-2">Tables</p>
              <p className="text-3xl font-bold text-green-600">12</p>
              <p className="text-xs text-green-600 mt-2">50% of today</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 font-semibold mb-2">Cubicles</p>
              <p className="text-3xl font-bold text-purple-600">8</p>
              <p className="text-xs text-purple-600 mt-2">100% of today</p>
            </div>
          </div>
        </Card>

        {/* Service Selection Modal Component */}
        <ServiceSelectionModal
          isOpen={showServiceModal}
          seatId={selectedSeat || ""}
          seatType={selectedSeat ? getSeatType(selectedSeat) : "chair"}
          selectedDuration={selectedDuration}
          extraHours={extraHours}
          totalPrice={totalPrice}
          basePrices={PRICING}
          onDurationChange={setSelectedDuration}
          onExtraHoursChange={setExtraHours}
          onConfirm={handleConfirmFromService}
          onClose={() => setShowServiceModal(false)}
        />

        {/* Confirmation Modal Component */}
        <ConfirmationModal
          isOpen={showConfirmationModal}
          seatId={bookingData?.seat || ""}
          seatType={bookingData?.type || "chair"}
          duration={bookingData?.duration || 0}
          extraHours={bookingData?.extraHours || 0}
          totalPrice={bookingData?.total || 0}
          onClose={handleConfirmBooking}
          onPrint={handlePrintReceipt}
        />
      </main>
    </div>
  );
};

// Helper seat type icon component
const AlertCircleIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default CashierDashboard;
