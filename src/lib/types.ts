

export type PresenceConfidence = 'Early' | 'Late' | 'Anomalous';

export type SeatStatus =
  | 'Ticket Verified'
  | 'Presence Confirmed'
  | 'Unverified Presence'
  | 'Likely Vacant';

export type ServiceRequestType = 'Food' | 'Clean' | 'Medical' | 'Help';
export type ServiceRequestStatus = 'Waiting for Action' | 'In Progress' | 'Closed';
export type ServiceRequestPriority = 'Low' | 'Medium' | 'High';
export type CompletionReason = 'Service Provided' | 'Handed Over at Station' | 'Not Feasible Onboard' | null;


export interface ServiceRequest {
  id: string;
  seatId: string;
  type: ServiceRequestType;
  status: ServiceRequestStatus;
  priority: ServiceRequestPriority;
  timeRaised: string;
  details?: string;
  snoozeUntil?: string;
  completionReason?: CompletionReason;
}

export interface Seat {
  id: string;
  seatNumber: string;
  berth?: 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper';
  status: SeatStatus;
  lastUpdated: string;
  suspiciousPatternScore: number;
  presenceConfidence?: PresenceConfidence;
  presenceTimestamp?: string;
  presenceSource?: 'Passenger' | 'Visual' | 'Inference';
  presenceContext?: string; // e.g., 'Confirmed after New Delhi Station'
  passenger?: {
    name: string;
    pnr: string;
    age: number;
    gender: 'M' | 'F';
    class: 'Sleeper' | 'AC 3 Tier' | 'AC 2 Tier' | 'AC 1 Tier';
  }
  alert?: Alert;
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
