import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, CreditCard, CheckCircle, XCircle, BarChart3, TrendingUp } from "lucide-react";

const CashierDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
      </main>
    </div>
  );
};

// Helper icon component
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
