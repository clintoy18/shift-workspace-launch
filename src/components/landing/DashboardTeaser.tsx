import { Button } from "@/components/ui/button";
import { Wifi, Clock, Calendar, MapPin } from "lucide-react";

const DashboardTeaser = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-slate-dark/80 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Your Workspace, <span className="text-primary">Your Dashboard</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Get instant access to your bookings, Wi-Fi credentials, and workspace 
              details — all in one sleek dashboard. Manage your work life with ease.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Unlock Your Dashboard
            </Button>
          </div>

          {/* Right - Glassmorphism Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Dashboard Card */}
              <div className="bg-card/10 backdrop-blur-xl border border-primary-foreground/20 rounded-2xl p-6 shadow-2xl">
                {/* User Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">JD</span>
                  </div>
                  <div>
                    <p className="text-primary-foreground font-semibold text-lg">Jane Doe</p>
                    <p className="text-primary-foreground/60 text-sm">Pro Member</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                </div>

                {/* Current Booking */}
                <div className="bg-primary-foreground/5 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Current Booking</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground font-medium">Hot Desk - Zone A</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="text-primary-foreground/60 text-sm">Downtown Hub</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">4h 32m</span>
                      </div>
                      <span className="text-primary-foreground/60 text-xs">remaining</span>
                    </div>
                  </div>
                </div>

                {/* WiFi Credentials */}
                <div className="bg-primary-foreground/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-2">
                    <Wifi className="w-4 h-4" />
                    <span>Wi-Fi Credentials</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground font-medium font-mono">Shift_Member</p>
                      <p className="text-primary-foreground/60 text-sm font-mono">••••••••</p>
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardTeaser;
