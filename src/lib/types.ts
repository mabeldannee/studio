export type SeatStatus =
  | 'Ticket Verified'
  | 'Presence Confirmed'
  | 'Unverified Presence'
  | 'Likely Vacant';

export interface Seat {
  id: string;
  seatNumber: string;
  status: SeatStatus;
  lastUpdated: string;
  isSuspicious?: boolean;
  suspiciousPatternScore: number;
}

export interface Coach {
  id: string;
  coachNumber: string;
  trainId: string;
  seats: Seat[];
  occupancy: number;
}

export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  journeyProgress: number;
  coaches: Coach[];
  alerts: Alert[];
}

export interface Alert {
  id: string;
  trainId: string;
  coachId: string;
  seatId?: string;
  type: string;
  description: string;
  timestamp: string;
  urgency: 'high' | 'medium' | 'low';
}
