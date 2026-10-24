import { calendar } from 'googleapis/build/src/apis/calendar';
import { gmail } from 'googleapis/build/src/apis/gmail';
import { auth } from 'googleapis/build/src/apis/oauth2';
import { people } from 'googleapis/build/src/apis/people';

// The 'googleapis' root eagerly loads all ~300 API clients (~60 MB of heap); load only the ones we use.
export const google = { auth, calendar, gmail, people };
