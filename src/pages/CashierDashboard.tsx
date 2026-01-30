import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, CreditCard, CheckCircle, XCircle, BarChart3 } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircleIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Process Payment</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Handle customer payments for desk bookings
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

        {/* Recent Transactions */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {[
              { id: "TXN001", customer: "John Doe", amount: "₱300", status: "completed" },
              { id: "TXN002", customer: "Jane Smith", amount: "₱550", status: "completed" },
              { id: "TXN003", customer: "Bob Johnson", amount: "₱700", status: "pending" },
              { id: "TXN004", customer: "Alice Brown", amount: "₱360", status: "completed" },
            ].map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div>
                  <p className="font-semibold text-foreground">{txn.customer}</p>
                  <p className="text-xs text-muted-foreground">{txn.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-foreground">{txn.amount}</p>
                  <div className="flex items-center gap-2">
                    {txn.status === "completed" ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-700">Completed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-xs font-semibold text-orange-700">Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
