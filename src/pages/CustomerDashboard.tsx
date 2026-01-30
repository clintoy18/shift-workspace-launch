import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, Settings, Calendar, Clock, MapPin } from "lucide-react";

const CustomerDashboard = () => {
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
            <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* My Bookings */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">My Bookings</h3>
                <p className="text-sm text-muted-foreground">
                  View your reservations
                </p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">2</p>
            <p className="text-xs text-muted-foreground mt-2">1 active, 1 completed</p>
          </Card>

          {/* Book a Seat */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Book a Seat</h3>
                <p className="text-sm text-muted-foreground">Reserve your desk</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 w-full mt-4">
              Browse Available
            </Button>
          </Card>

          {/* Account Settings */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Account</h3>
                <p className="text-sm text-muted-foreground">Manage profile</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Edit Profile
            </Button>
          </Card>
        </div>

        {/* Workspace Info */}
        <Card className="p-6 mb-8 bg-card/50">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Our Workspace
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">Downtown Hub</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Hours</p>
                <p className="font-semibold text-foreground">6AM - 10PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Available Seats</p>
                <p className="font-semibold text-foreground">18/24</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 text-primary mt-0.5 shrink-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold text-green-600">Open</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Booking */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Current Booking</h2>
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Desk A3 - Chair</h3>
                <p className="text-sm text-muted-foreground">3 hours @ ₱300/booking</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Active
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Start Time</p>
                <p className="font-semibold text-foreground">9:00 AM</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">End Time</p>
                <p className="font-semibold text-foreground">12:00 PM</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="font-semibold text-foreground">3 hours</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Price</p>
                <p className="font-semibold text-foreground">₱300</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Extend Booking
              </Button>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </Card>
        </div>

        {/* Booking History */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Booking History
          </h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-semibold text-foreground">Desk B5 - Table</p>
                  <p className="text-sm text-muted-foreground">Jan 28, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">6 hours</p>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                    Completed
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-semibold text-foreground">Desk C2 - Chair</p>
                  <p className="text-sm text-muted-foreground">Jan 25, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">3 hours</p>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
