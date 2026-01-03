

import type { Train, Coach, Seat, Alert, SeatStatus, PresenceConfidence, ServiceRequest, ServiceRequestStatus, ServiceRequestType } from '@/lib/types';

const seatStatuses: SeatStatus[] = [
  'Ticket Verified',
  'Presence Confirmed',
  'Unverified Presence',
  'Likely Vacant',
];

const berths: Seat['berth'][] = ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper'];
const passengerClasses: Seat['passenger']['class'][] = ['Sleeper', 'AC 3 Tier', 'AC 2 Tier', 'AC 1 Tier'];
const passengerGenders: Seat['passenger']['gender'][] = ['M', 'F'];


const presenceConfidences: PresenceConfidence[] = ['Early', 'Late', 'Anomalous'];
const presenceSources: Seat['presenceSource'][] = ['Passenger', 'Visual', 'Inference'];
const stations = ['New Delhi', 'Kanpur', 'Allahabad', 'Mughalsarai'];
const serviceRequestTypes: ServiceRequestType[] = ['Food', 'Clean', 'Medical', 'Help'];
const serviceRequestStatuses: ServiceRequestStatus[] = ['Waiting for Action', 'In Progress', 'Closed'];
const passengerNames = ['Rajesh K.', 'Priya S.', 'Amit V.', 'Sunita M.', 'V. Kumar', 'Deepa R.', 'John Doe', 'P. Kumar', 'I. Devi', 'S. Lee', 'P. Patel', 'R. Khan'];

const generateServiceRequests = (coachId: string, seats: Seat[]): ServiceRequest[] => {
    const requests: ServiceRequest[] = [];
    const usedSeats = new Set();
    seats.forEach(seat => {
        if (Math.random() < 0.15 && !usedSeats.has(seat.id)) { // 15% chance a seat has a request
            usedSeats.add(seat.id);
            const type = serviceRequestTypes[Math.floor(Math.random() * serviceRequestTypes.length)];
            let priority: ServiceRequest['priority'] = 'Low';
            if (type === 'Medical') priority = 'High';
            if (type === 'Clean') priority = 'Medium';
            
            requests.push({
                id: `req-${seat.id}-${type}`,
                seatId: seat.id,
                type,
                status: serviceRequestStatuses[Math.floor(Math.random() * serviceRequestStatuses.length)],
                priority: priority,
                timeRaised: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 2).toISOString(),
                details: type === 'Clean' ? 'Washroom area needs attention.' : (type === 'Food' ? 'Requesting water bottle.' : undefined)
            });
        }
    });
    return requests;
};


const generateSeats = (coachId: string, count: number): Seat[] => {
  return Array.from({ length: count }, (_, i) => {
    const seatNumber = `${coachId}-${String(i + 1).padStart(2, '0')}`;
    let status = seatStatuses[Math.floor(Math.random() * seatStatuses.length)];
    
    let presenceConfidence: PresenceConfidence | undefined = undefined;
    let presenceTimestamp: string | undefined = undefined;
    let presenceSource: Seat['presenceSource'] | undefined = undefined;
    let presenceContext: string | undefined = undefined;
    
    if (status === 'Presence Confirmed') {
        presenceConfidence = presenceConfidences[Math.floor(Math.random() * presenceConfidences.length)];
        presenceTimestamp = new Date(Date.now() - Math.random() * 1000 * 60 * 30).toISOString();
        presenceSource = presenceSources[Math.floor(Math.random() * presenceSources.length)];
        presenceContext = `Confirmed after ${stations[Math.floor(Math.random() * stations.length)]} Station`;
    } else if (status !== 'Ticket Verified') {
        // Ensure other statuses don't have presence details
    }


    let suspiciousPatternScore = Math.random();
    if (status === 'Presence Confirmed') {
        if (presenceConfidence === 'Anomalous' || presenceConfidence === 'Late') {
            suspiciousPatternScore = Math.random() * 0.4 + 0.6; // 0.6 - 1.0
        } else {
            suspiciousPatternScore = Math.random() * 0.3 + 0.3; // 0.3 - 0.6
        }
    }

    const passenger = status !== 'Likely Vacant' ? {
        name: passengerNames[Math.floor(Math.random() * passengerNames.length)],
        pnr: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000000) + 1000000}`,
        age: Math.floor(Math.random() * 60) + 18,
        gender: passengerGenders[Math.floor(Math.random() * passengerGenders.length)],
        class: passengerClasses[Math.floor(Math.random() * passengerClasses.length)],
    } : undefined;

    return {
      id: seatNumber,
      seatNumber: seatNumber,
      berth: berths[i % berths.length],
      status: status,
      lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60).toISOString(),
      suspiciousPatternScore,
      presenceConfidence,
      presenceTimestamp,
      presenceSource,
      presenceContext,
      passenger,
    };
  });
};

const generateCoaches = (trainId: string, coachNumbers: string[]): Coach[] => {
  return coachNumbers.map(coachNumber => {
    const seats = generateSeats(coachNumber, 72);
    const occupiedSeats = seats.filter(s => s.status !== 'Likely Vacant').length;
    const serviceRequests = generateServiceRequests(coachNumber, seats);
    return {
      id: `${trainId}-${coachNumber}`,
      coachNumber,
      trainId,
      seats,
      occupancy: Math.round((occupiedSeats / seats.length) * 100),
      serviceRequests,
    };
  });
};

const generateAlertsForSeat = (trainId: string, coachId: string, seat: Seat): Alert[] => {
    const alerts: Alert[] = [];
    if (seat.status === 'Presence Confirmed' || seat.status === 'Unverified Presence') {
        const rand = Math.random();
        if (rand < 0.3) {
            alerts.push({
              id: `alert-age-${seat.id}`,
              trainId,
              coachId: coachId,
              seatId: seat.id,
              type: 'Passenger age discrepancy',
              description: `Passenger age discrepancy flagged`,
              timestamp: new Date().toISOString(),
              urgency: 'high',
            });
        } else if (rand < 0.6) {
             alerts.push({
              id: `alert-ticket-${seat.id}`,
              trainId,
              coachId: coachId,
              seatId: seat.id,
              type: 'Ticket not scanned at entry',
              description: `Ticket for seat ${seat.seatNumber} was not scanned at the entry gate.`,
              timestamp: new Date().toISOString(),
              urgency: 'high',
            });
        }
    }
    
    if (seat.status === 'Likely Vacant' && Math.random() > 0.5) {
        alerts.push({
          id: `alert-vacant-${seat.id}`,
          trainId,
          coachId: coachId,
          seatId: seat.id,
          type: 'Likely Vacant (No-show predicted)',
          description: `Seat ${seat.seatNumber} has been marked as 'Likely Vacant' for an extended period.`,
          timestamp: new Date().toISOString(),
          urgency: 'medium',
        });
    }

    return alerts;
}

const generateAlerts = (trainId: string, coaches: Coach[]): Alert[] => {
  const alerts: Alert[] = [];
  coaches.forEach(coach => {
    coach.seats.forEach(seat => {
      const seatAlerts = generateAlertsForSeat(trainId, coach.id, seat);
      if(seatAlerts.length > 0){
        seat.alert = seatAlerts[0];
        alerts.push(...seatAlerts);
      }
    });
    if (coach.occupancy > 95 && Math.random() > 0.5) {
        alerts.push({
          id: `alert-overcrowd-${coach.id}`,
          trainId,
          coachId: coach.id,
          type: 'High crowd density detected',
          description: `Coach ${coach.coachNumber} is at ${coach.occupancy}% capacity.`,
          timestamp: new Date().toISOString(),
          urgency: 'low',
        });
    }
  });
  return alerts;
};

const coaches1 = generateCoaches('TRN12951', ['A1', 'S3', 'S5', 'B2', 'B3', 'S6']);
const coaches2 = generateCoaches('TRN67890', ['S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'A1']);

export const trains: Train[] = [
  {
    id: 'TRN12951',
    trainNumber: '12951',
    name: 'Rajdhani Express',
    journeyProgress: 75,
    coaches: coaches1,
    alerts: generateAlerts('TRN12951', coaches1),
  },
  {
    id: 'TRN67890',
    trainNumber: '67890',
    name: 'Shatabdi Express',
    journeyProgress: 40,
    coaches: coaches2,
    alerts: generateAlerts('TRN67890', coaches2),
  },
  {
    id: 'TRN10101',
    trainNumber: '10101',
    name: 'Duronto Express',
    journeyProgress: 90,
    coaches: [],
    alerts: [],
  },
];

export const findTrain = (trainId: string): Train | undefined => trains.find(t => t.id === trainId);

export const findCoach = (coachId: string): Coach | undefined => {
    for (const train of trains) {
        const coach = train.coaches.find(c => c.id === coachId);
        if (coach) return coach;
    }
    return undefined;
}
