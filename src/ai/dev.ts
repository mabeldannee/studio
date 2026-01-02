import { config } from 'dotenv';
config();

import '@/ai/flows/explain-alerts.ts';
import '@/ai/flows/explain-suspicious-activity.ts';
import '@/ai/flows/smart-check-prioritization.ts';
import '@/ai/flows/ai-summarize-coach.ts';