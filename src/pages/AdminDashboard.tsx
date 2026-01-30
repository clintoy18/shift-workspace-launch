import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, TrendingUp, AlertCircle, BarChart3 } from "lucide-react";

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
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-foreground">1,248</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Bookings</p>
                <p className="text-3xl font-bold text-foreground">456</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold text-foreground">₱245K</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Management */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">User Management</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Total Customers</span>
                <span className="font-semibold text-foreground">850</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Cashiers</span>
                <span className="font-semibold text-foreground">23</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Admin Accounts</span>
                <span className="font-semibold text-foreground">5</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Manage Users
            </Button>
          </Card>

          {/* Locations Management */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Locations</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Active Locations</span>
                <span className="font-semibold text-foreground">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Total Desks</span>
                <span className="font-semibold text-foreground">72</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Occupancy Rate</span>
                <span className="font-semibold text-foreground">78%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Locations
            </Button>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Reports</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div>
                <p className="font-semibold text-foreground">System Maintenance</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                Pending
              </span>
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="font-semibold text-foreground">Database Backup</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                Completed
              </span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
