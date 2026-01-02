# **App Name**: RailAssist AI

## Core Features:

- TTE Login with AI Security Intelligence: Firebase Authentication with role validation and AI-powered analysis of login metadata (time, device, frequency) to generate human-readable explanations for potentially suspicious activity. This acts as a tool for flagging anomalies, not for making authentication decisions.
- Real-time Train and Coach Overview: Dashboard providing a real-time view of active trains, journey progress, and coach occupancy status, including Presence Confirmed, Unverified Presence, Likely Vacant, and Ticket Verified counts.
- Coach Detail Page with Seat Grid: Detailed view of each coach with a responsive seat layout, color-coded seat status (Presence Confirmed, Unverified Presence, Likely Vacant, Ticket Verified), and seat-specific information on click (seat number, current state, last updated time, AI explanation).
- Smart Check Prioritization: AI-assisted prioritization of seat verification order based on presence confirmation, ticket status, suspicious patterns identified by Vertex AI, and occupancy rates, with Gemini generating explanations for the prioritization. The AI is a tool to recommend and not enforce.
- AI Summary for Coaches: Provides an AI-generated summary of each coach, including an overview, identification of risk hotspots, and a suggested check order, using Gemini via Genkit, with a fallback to rule-based text if AI is unavailable.
- Alerts and Exceptions: Real-time alerts for scenarios like Presence Confirmed but Ticket Unverified, Persistent Likely Vacant seats, and overcrowding risks, with AI explanations stating the need for verification, not proof of validity. Clicking the alert navigates to the relevant seat.
- Ticket Verification: Ability for TTEs to mark tickets as 'Ticket Verified' after physical ID and ticket check. This action is logged with a timestamp and TTE ID, and cannot be triggered by passengers.
- Enhance User Presence Logic: Enhance the existing RailSight AI prototype by upgrading the “User Presence” logic into an operational intelligence layer. Presence becomes an actionable operational signal. TTEs know exactly where to check first. AI assists without overreach. System remains legally and operationally safe.

## Style Guidelines:

- Primary color: Navy blue (#1A237E). This deep blue evokes a sense of trust, authority, and security, aligning with the critical decision-support function of the app. It reflects the established and reliable nature of Indian Railways while maintaining a modern, digital aesthetic.
- Background color: Light blue (#E3F2FD), providing a clean, calm, and operational-first environment that minimizes visual fatigue.
- Accent color: Light purple (#9FA8DA) for interactive elements and visual emphasis, ensuring a balance of prominence and subtlety that maintains user focus on the system's alerts and informational content.
- Body and headline font: 'Inter' (sans-serif), chosen for its operational clarity, contemporary style, and readability in data-rich interfaces.
- Utilize Google Material Design Icons to provide clear, consistent, and instantly recognizable visual cues throughout the interface, optimizing usability and user familiarity.
- Employs a grid-based, operational-first layout prioritizing data clarity, ease of navigation, and responsive design to adapt seamlessly across devices used by TTEs in various operational environments.
- Incorporate minimal, functional animations, like subtle transitions, for key interactions such as data loading, seat selection, and alert notifications, enhancing user engagement without detracting from the application's primary goal of real-time operations intelligence.