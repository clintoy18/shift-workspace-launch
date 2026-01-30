import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, TrendingUp, AlertCircle, BarChart3, Car } from "lucide-react";

const AdminDashboard = () => {
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
            <h1 className="text-2xl font-bold text-foreground">Workspace Analytics</h1>
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
        {/* Overall Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Desks</p>
                <p className="text-3xl font-bold text-foreground">24</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Currently Occupied</p>
                <p className="text-3xl font-bold text-foreground">18</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-3xl font-bold text-foreground">75%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold text-foreground">18</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Desk Type Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Chairs */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Chairs</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Total</span>
                <span className="font-semibold text-foreground">10</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Occupied</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Available</span>
                <span className="font-semibold text-blue-600">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-foreground font-semibold">Occupancy</span>
                <span className="font-bold text-blue-600">80%</span>
              </div>
            </div>
          </Card>

          {/* Tables */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Tables</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Total</span>
                <span className="font-semibold text-foreground">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Occupied</span>
                <span className="font-semibold text-green-600">6</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Available</span>
                <span className="font-semibold text-blue-600">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-foreground font-semibold">Occupancy</span>
                <span className="font-bold text-green-600">75%</span>
              </div>
            </div>
          </Card>

          {/* Cubicles */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Cubicles</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Total</span>
                <span className="font-semibold text-foreground">6</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Occupied</span>
                <span className="font-semibold text-green-600">4</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Available</span>
                <span className="font-semibold text-blue-600">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm text-foreground font-semibold">Occupancy</span>
                <span className="font-bold text-purple-600">67%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue & Bookings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Revenue</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Today</span>
                <span className="font-semibold text-foreground">₱8,450</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">This Week</span>
                <span className="font-semibold text-foreground">₱52,300</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">This Month</span>
                <span className="font-semibold text-foreground">₱185,600</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              View Detailed Reports
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Active Bookings</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Today</span>
                <span className="font-semibold text-foreground">18</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">This Week</span>
                <span className="font-semibold text-foreground">124</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Total Members</span>
                <span className="font-semibold text-foreground">87</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Members
            </Button>
          </Card>
        </div>

        {/* System Status */}
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div>
                <p className="font-semibold text-foreground">Workspace Operations</p>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="font-semibold text-foreground">Last Sync</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                Synced
              </span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
