

export type PresenceConfidence = 'Early' | 'Late' | 'Anomalous';

export type SeatStatus =
  | 'Ticket Verified'
  | 'Presence Confirmed'
  | 'Unverified Presence'
  | 'Likely Vacant';

export type ServiceRequestType = 'Food' | 'Clean' | 'Medical' | 'Help';
export type ServiceRequestStatus = 'Pending' | 'Acknowledged' | 'Completed';
export type ServiceRequestPriority = 'Low' | 'Medium' | 'High';


export interface ServiceRequest {
  id: string;
  seatId: string;
  type: ServiceRequestType;
  status: ServiceRequestStatus;
  priority: ServiceRequestPriority;
  timeRaised: string;
  details?: string; // e.g., for 'Clean', 'Washroom area'
}

export interface Seat {
  id: string;
  seatNumber: string;
  status: SeatStatus;
  lastUpdated: string;
  isSuspicious?: boolean;
  suspiciousPatternScore: number;
  presenceConfidence?: PresenceConfidence;
  presenceTimestamp?: string;
  presenceSource?: 'Passenger' | 'Visual' | 'Inference';
  presenceContext?: string; // e.g., 'Confirmed after New Delhi Station'
}

export interface Coach {
  id: string;
  coachNumber: string;
  trainId: string;
  seats: Seat[];
  occupancy: number;
  serviceRequests: ServiceRequest[];
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
  context?: {
    presenceTiming?: PresenceConfidence;
  };
}
