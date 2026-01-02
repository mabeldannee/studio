import type { Train, Coach, Seat, Alert, SeatStatus, PresenceConfidence } from '@/lib/types';

const seatStatuses: SeatStatus[] = [
  'Ticket Verified',
  'Presence Confirmed',
  'Unverified Presence',
  'Likely Vacant',
];

const presenceConfidences: PresenceConfidence[] = ['Early', 'Late', 'Anomalous'];
const presenceSources: Seat['presenceSource'][] = ['Passenger', 'Visual', 'Inference'];
const stations = ['New Delhi', 'Kanpur', 'Allahabad', 'Mughalsarai'];

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
    } else {
        // Ensure that only Presence Confirmed seats have presence details
        status = (['Unverified Presence', 'Likely Vacant', 'Ticket Verified'] as SeatStatus[])[Math.floor(Math.random() * 3)];
    }


    let suspiciousPatternScore = Math.random();
    if (status === 'Presence Confirmed') {
        if (presenceConfidence === 'Anomalous' || presenceConfidence === 'Late') {
            suspiciousPatternScore = Math.random() * 0.4 + 0.6; // 0.6 - 1.0
        } else {
            suspiciousPatternScore = Math.random() * 0.3 + 0.3; // 0.3 - 0.6
        }
    }

    return {
      id: seatNumber,
      seatNumber: seatNumber,
      status: status,
      lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60).toISOString(),
      isSuspicious: status === 'Presence Confirmed',
      suspiciousPatternScore,
      presenceConfidence,
      presenceTimestamp,
      presenceSource,
      presenceContext,
    };
  });
};

const generateCoaches = (trainId: string, coachNumbers: string[]): Coach[] => {
  return coachNumbers.map(coachNumber => {
    const seats = generateSeats(coachNumber, 72);
    const occupiedSeats = seats.filter(s => s.status !== 'Likely Vacant').length;
    return {
      id: `${trainId}-${coachNumber}`,
      coachNumber,
      trainId,
      seats,
      occupancy: Math.round((occupiedSeats / seats.length) * 100),
    };
  });
};

const generateAlerts = (trainId: string, coaches: Coach[]): Alert[] => {
  const alerts: Alert[] = [];
  coaches.forEach(coach => {
    coach.seats.forEach(seat => {
      if (seat.status === 'Presence Confirmed' && (seat.presenceConfidence === 'Late' || seat.presenceConfidence === 'Anomalous')) {
        alerts.push({
          id: `alert-${seat.id}`,
          trainId,
          coachId: coach.id,
          seatId: seat.id,
          type: 'Presence Confirmed but Ticket Unverified',
          description: `Seat ${seat.seatNumber} has a confirmed presence but the ticket is not verified. Please check immediately.`,
          timestamp: new Date().toISOString(),
          urgency: 'high',
          context: {
              presenceTiming: seat.presenceConfidence
          }
        });
      }
      if (seat.status === 'Likely Vacant' && Math.random() > 0.95) {
        alerts.push({
          id: `alert-vacant-${seat.id}`,
          trainId,
          coachId: coach.id,
          seatId: seat.id,
          type: 'Persistent Likely Vacant',
          description: `Seat ${seat.seatNumber} has been marked as 'Likely Vacant' for an extended period.`,
          timestamp: new Date().toISOString(),
          urgency: 'low',
        });
      }
    });
    if (coach.occupancy > 95) {
        alerts.push({
          id: `alert-overcrowd-${coach.id}`,
          trainId,
          coachId: coach.id,
          type: 'Overcrowding Risk',
          description: `Coach ${coach.coachNumber} is at ${coach.occupancy}% capacity. Monitor for overcrowding.`,
          timestamp: new Date().toISOString(),
          urgency: 'medium',
        });
    }
  });
  return alerts.slice(0, 5); // Limit alerts for UI
};

const coaches1 = generateCoaches('TRN12345', ['S1', 'S2', 'S3', 'B1', 'B2', 'A1']);
const coaches2 = generateCoaches('TRN67890', ['S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'A1']);

export const trains: Train[] = [
  {
    id: 'TRN12345',
    trainNumber: '12345',
    name: 'Shatabdi Express',
    journeyProgress: 75,
    coaches: coaches1,
    alerts: generateAlerts('TRN12345', coaches1),
  },
  {
    id: 'TRN67890',
    trainNumber: '67890',
    name: 'Rajdhani Express',
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
