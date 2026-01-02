"use client";

import { useState, useEffect } from 'react';
import type { Coach, Seat } from '@/lib/types';
import { AISummary } from '@/components/coach/ai-coach-summary';
import { SmartCheck } from '@/components/coach/smart-check';
import { SeatGrid } from '@/components/coach/seat-grid';
import { SeatDetailsSheet } from '@/components/coach/seat-details-sheet';

interface CoachViewProps {
  coach: Coach;
  initialSeatId?: string;
}

export function CoachView({ coach, initialSeatId }: CoachViewProps) {
  const [seats, setSeats] = useState<Seat[]>(coach.seats);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (initialSeatId) {
      const seatToSelect = seats.find(s => s.id === initialSeatId);
      if (seatToSelect) {
        handleSeatSelect(seatToSelect);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSeatId, seats]);

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeat(seat);
    setIsSheetOpen(true);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setSelectedSeat(null);
    }
  };

  const updateSeatStatus = (seatId: string, status: Seat['status']) => {
    setSeats(currentSeats =>
      currentSeats.map(seat =>
        seat.id === seatId
          ? { ...seat, status, lastUpdated: new Date().toISOString() }
          : seat
      )
    );
    // Also update the selected seat if it's the one being changed
    if (selectedSeat && selectedSeat.id === seatId) {
      setSelectedSeat(prev => prev ? { ...prev, status, lastUpdated: new Date().toISOString() } : null);
    }
  };

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-5">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AISummary coach={coach} seats={seats} />
        </div>
        <SmartCheck seats={seats} setSeats={setSeats} occupancyRate={coach.occupancy} />
        <SeatGrid seats={seats} onSeatSelect={handleSeatSelect} />
      </div>
      <div className="lg:col-span-1 xl:col-span-2">
        {/* Can be used for additional details or permanent info panel */}
      </div>

      <SeatDetailsSheet
        seat={selectedSeat}
        isOpen={isSheetOpen}
        onOpenChange={handleSheetOpenChange}
        onUpdateStatus={updateSeatStatus}
      />
    </div>
  );
}
