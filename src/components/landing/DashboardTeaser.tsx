import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Check, Info, X } from "lucide-react"; // Assuming lucide-react is available

const DashboardTeaser = () => {
  const rows = ["A", "B", "C", "D"];
  const cols = [1, 2, 3, 4, 5, 6];
  const [occupied, setOccupied] = useState<Set<string>>(new Set(["A3", "B2", "C6", "D4"]));
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  // Pricing & modal state
  const [showPricingModal, setShowPricingModal] = useState(false);
  const basePrices: Record<number, number> = { 3: 300, 6: 550, 8: 700 };
  const [selectedDuration, setSelectedDuration] = useState<number>(3);
  const [extraHours, setExtraHours] = useState<number>(0);
  const [confirmation, setConfirmation] = useState<{ seat: string; duration: number; extraHours: number; total: number } | null>(null);

  const getSeatType = (id: string): "chair" | "table" | "room" => {
    const col = parseInt(id.slice(1), 10);
    if (col % 5 === 0) return "room";
    if (col % 3 === 0) return "table";
    return "chair";
  };

  const totalPrice = useMemo(() => {
    return basePrices[selectedDuration] + extraHours * 60;
  }, [selectedDuration, extraHours]);

  const SeatIcon = ({ type }: { type: "chair" | "table" | "room" }) => {
    // Standardized for better alignment
    const paths = {
      chair: "M6 7v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7 M4 15v2a1 1 0 0 0 1 1h1 M20 15v2a1 1 0 0 1-1 1h-1",
      table: "M3 8h18v4H3z M6 12v6 M18 12v6",
      room: "M3 3h18v18H3z M9 12h2v4"
    };
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[type]} />
      </svg>
    );
  };

  return (
    <section className="py-24 relative bg-slate-950 overflow-hidden">
      {/* Background with optimized overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2070&q=80" 
          className="w-full h-full object-cover opacity-30" 
          alt="Office Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-primary/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content: Value Proposition */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live Availability
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Work where you <span className="text-primary">feel inspired.</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Skip the front desk. Select your preferred spot, book in seconds, and get your Wi-Fi access codes instantly sent to your dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="px-8 shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                Join the community
              </Button>
              <Button variant="outline" size="lg" className="text-black border-white/20 hover:bg-white/10">
                View Pricing
              </Button>
            </div>
          </div>

          {/* Right: Interactive Seat Map */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-3xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-white font-bold text-xl">Floor Map</h3>
                  <p className="text-slate-400 text-sm mt-1">Select an available workstation</p>
                </div>
                {selectedSeat && (
                  <div className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold animate-in fade-in zoom-in">
                    Selected: {selectedSeat}
                  </div>
                )}
              </div>

              {/* Grid with improved spacing */}
              <div className="space-y-4">
                {rows.map((row) => (
                  <div key={row} className="flex items-center gap-4">
                    <span className="w-4 text-xs font-bold text-slate-500 uppercase">{row}</span>
                    <div className="flex-1 grid grid-cols-6 gap-3">
                      {cols.map((col) => {
                        const id = `${row}${col}`;
                        const isOccupied = occupied.has(id);
                        const isSelected = selectedSeat === id;
                        const type = getSeatType(id);
                        
                        return (
                          <button
                            key={id}
                            disabled={isOccupied}
                            onClick={() => setSelectedSeat(isSelected ? null : id)}
                            className={`
                              group relative aspect-square rounded-xl flex items-center justify-center transition-all duration-200
                              ${isOccupied 
                                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-transparent' 
                                : isSelected
                                ? 'bg-primary text-white shadow-xl shadow-primary/40 scale-110 z-10'
                                : 'bg-slate-700/30 text-slate-300 border border-white/5 hover:border-primary/50 hover:bg-slate-700/50'}
                            `}
                          >
                            <SeatIcon type={type} />
                            {/* Simple tooltip on hover */}
                            {!isOccupied && !isSelected && (
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                {type} {id}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Legend */}
              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-4">
                   <div className="flex flex-col items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                      <span className="text-[10px] text-slate-500 uppercase">Taken</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-[10px] text-slate-500 uppercase">Selected</span>
                   </div>
                </div>
                <Button 
                  disabled={!selectedSeat} 
                  onClick={() => setShowPricingModal(true)}
                  className="rounded-full px-6 transition-all active:scale-95"
                >
                  Confirm Spot
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal - Optimized for mobile/web accessibility */}
      {confirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} strokeWidth={3} />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">Spot Secured!</h4>
            <p className="text-slate-500 mt-2">You're all set for seat <strong>{confirmation.seat}</strong>.</p>
            
            <div className="my-6 p-4 bg-slate-50 rounded-2xl grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                <span className="text-slate-900 font-semibold">{confirmation.duration + confirmation.extraHours} hrs</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Paid</span>
                <span className="text-slate-900 font-semibold">₱{confirmation.total}</span>
              </div>
            </div>

            <Button className="w-full py-6 rounded-2xl" onClick={() => setConfirmation(null)}>
              Go to My Dashboard
            </Button>
          </div>
        </div>
      )}

      {/* Pricing Selection Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in slide-in-from-bottom-4">
          <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Duration & Pricing</h3>
                <button onClick={() => setShowPricingModal(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
              </div>

              <div className="space-y-3">
                {[3, 6, 8].map((d) => (
                  <button 
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      selectedDuration === d ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="text-left">
                      <span className="block font-bold text-slate-900">{d} Hours</span>
                      <span className="text-xs text-slate-500">Perfect for focused work</span>
                    </div>
                    <span className="text-lg font-bold text-primary">₱{basePrices[d]}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-500">Need extra time?</span>
                </div>
                <div className="flex items-center gap-3">
                   <input 
                    type="number" 
                    min={0} 
                    value={extraHours} 
                    onChange={(e) => setExtraHours(parseInt(e.target.value || '0'))}
                    className="w-16 p-2 rounded-lg border border-slate-200 text-center font-bold"
                  />
                  <span className="text-xs text-slate-400">@ ₱60/hr</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block">Total Amount</span>
                <span className="text-2xl font-black text-slate-900">₱{totalPrice}</span>
              </div>
              <Button 
                size="lg" 
                className="px-8 rounded-xl"
                onClick={() => {
                  setOccupied(prev => new Set(prev).add(selectedSeat!));
                  setConfirmation({ seat: selectedSeat!, duration: selectedDuration, extraHours, total: totalPrice });
                  setShowPricingModal(false);
                  setSelectedSeat(null);
                }}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardTeaser;