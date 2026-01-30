import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  seatId: string;
  seatType: "chair" | "table" | "cubicle";
  duration: number;
  extraHours: number;
  totalPrice: number;
  onClose: () => void;
  onPrint: () => void;
}

export default function ConfirmationModal({
  isOpen,
  seatId,
  seatType,
  duration,
  extraHours,
  totalPrice,
  onClose,
  onPrint,
}: ConfirmationModalProps) {
  const totalDuration = duration + extraHours;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <DialogTitle className="text-center">Booking Confirmed!</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Reference #</span>
              <span className="font-mono font-semibold">SHIFT{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Seat ID</span>
              <span className="font-semibold">{seatId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Seat Type</span>
              <span className="font-semibold capitalize">{seatType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Duration</span>
              <span className="font-semibold">{totalDuration} hour{totalDuration !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="font-bold">Total Amount</span>
              <span className="text-lg font-bold text-primary">₱{totalPrice}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Done
          </Button>
          <Button onClick={onPrint} className="flex-1 bg-primary hover:bg-primary/90">
            Print Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
