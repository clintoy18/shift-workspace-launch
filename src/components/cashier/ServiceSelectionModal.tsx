import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ServiceSelectionModalProps {
  isOpen: boolean;
  seatId: string;
  seatType: "chair" | "table" | "cubicle";
  selectedDuration: number;
  extraHours: number;
  totalPrice: number;
  basePrices: Record<number | string, number>;
  onDurationChange: (duration: number) => void;
  onExtraHoursChange: (hours: number) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ServiceSelectionModal({
  isOpen,
  seatId,
  seatType,
  selectedDuration,
  extraHours,
  totalPrice,
  basePrices,
  onDurationChange,
  onExtraHoursChange,
  onConfirm,
  onClose,
}: ServiceSelectionModalProps) {
  const durations = [3, 6, 8];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Seat {seatId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Seat Type</p>
            <p className="font-semibold text-foreground capitalize">{seatType}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Select Duration</p>
            <div className="grid grid-cols-3 gap-2">
              {durations.map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  onClick={() => onDurationChange(duration)}
                  className="w-full"
                >
                  {duration}h
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Extra Hours</p>
            <Input
              type="number"
              min="0"
              value={extraHours}
              onChange={(e) => onExtraHoursChange(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full"
            />
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Base Price ({selectedDuration}h)</span>
              <span className="font-semibold">₱{basePrices[selectedDuration]}</span>
            </div>
            {extraHours > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Extra ({extraHours}h @ ₱{basePrices.extra}/h)</span>
                <span className="font-semibold">₱{extraHours * basePrices.extra}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t">
              <span className="font-bold">Total</span>
              <span className="text-lg font-bold text-primary">₱{totalPrice}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
