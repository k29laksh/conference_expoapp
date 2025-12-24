// Persistent storage for saved sessions using AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  venue?: string;
  speaker?: string;
  designation?: string;
  type: "session" | "break";
  day: number;
}

interface SpeakerSession {
  id: string;
  speakerName: string;
  sessionTitle: string;
  time: string;
  day: string;
}

const SESSIONS_KEY = "@saved_sessions";
const SPEAKERS_KEY = "@saved_speakers";

// In-memory cache for faster access
let savedSessions: ScheduleItem[] = [];
let savedSpeakers: SpeakerSession[] = [];
let listeners: (() => void)[] = [];
let isInitialized = false;

// Initialize storage from AsyncStorage
async function initializeStorage(): Promise<void> {
  if (isInitialized) return;

  try {
    const [sessionsData, speakersData] = await Promise.all([
      AsyncStorage.getItem(SESSIONS_KEY),
      AsyncStorage.getItem(SPEAKERS_KEY),
    ]);

    savedSessions = sessionsData ? JSON.parse(sessionsData) : [];
    savedSpeakers = speakersData ? JSON.parse(speakersData) : [];
    isInitialized = true;
  } catch (error) {
    console.error("Error loading saved data:", error);
    savedSessions = [];
    savedSpeakers = [];
    isInitialized = true;
  }
}

// Save sessions to AsyncStorage
async function saveSessions(): Promise<void> {
  try {
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(savedSessions));
  } catch (error) {
    console.error("Error saving sessions:", error);
  }
}

// Save speakers to AsyncStorage
async function saveSpeakers(): Promise<void> {
  try {
    await AsyncStorage.setItem(SPEAKERS_KEY, JSON.stringify(savedSpeakers));
  } catch (error) {
    console.error("Error saving speakers:", error);
  }
}

export const sessionStorage = {
  // Initialize storage (call on app start)
  initialize: initializeStorage,

  // Get all saved sessions
  getSavedSessions: (): ScheduleItem[] => {
    return [...savedSessions];
  },

  // Get all saved speakers
  getSavedSpeakers: (): SpeakerSession[] => {
    return [...savedSpeakers];
  },

  // Check if session is saved
  isSessionSaved: (sessionId: string): boolean => {
    return savedSessions.some((s) => s.id === sessionId);
  },

  // Check if speaker is saved
  isSpeakerSaved: (speakerName: string): boolean => {
    return savedSpeakers.some((s) => s.speakerName === speakerName);
  },

  // Add session
  addSession: async (session: ScheduleItem): Promise<void> => {
    if (!sessionStorage.isSessionSaved(session.id)) {
      savedSessions.push(session);
      await saveSessions();
      notifyListeners();
    }
  },

  // Remove session
  removeSession: async (sessionId: string): Promise<void> => {
    savedSessions = savedSessions.filter((s) => s.id !== sessionId);
    await saveSessions();
    notifyListeners();
  },

  // Toggle session (add if not saved, remove if saved)
  toggleSession: async (session: ScheduleItem): Promise<boolean> => {
    const isSaved = sessionStorage.isSessionSaved(session.id);
    if (isSaved) {
      await sessionStorage.removeSession(session.id);
      // Also remove linked speaker if exists
      if (session.speaker) {
        await sessionStorage.removeSpeaker(session.speaker);
      }
    } else {
      await sessionStorage.addSession(session);
      // Also add linked speaker if exists
      if (session.speaker) {
        const speakerSession: SpeakerSession = {
          id: `speaker-${session.speaker}`,
          speakerName: session.speaker,
          sessionTitle: session.title,
          time: session.time,
          day: session.day === 1 ? "Day-I" : "Day-II",
        };
        await sessionStorage.addSpeaker(speakerSession);
      }
    }
    return !isSaved; // Return new state
  },

  // Add speaker session
  addSpeaker: async (speaker: SpeakerSession): Promise<void> => {
    if (!sessionStorage.isSpeakerSaved(speaker.speakerName)) {
      savedSpeakers.push(speaker);
      await saveSpeakers();
      notifyListeners();
    }
  },

  // Remove speaker session
  removeSpeaker: async (speakerName: string): Promise<void> => {
    savedSpeakers = savedSpeakers.filter((s) => s.speakerName !== speakerName);
    await saveSpeakers();
    notifyListeners();
  },

  // Toggle speaker (add if not saved, remove if saved)
  toggleSpeaker: async (
    speaker: SpeakerSession,
    linkedScheduleSessions?: ScheduleItem[]
  ): Promise<boolean> => {
    const isSaved = sessionStorage.isSpeakerSaved(speaker.speakerName);
    if (isSaved) {
      await sessionStorage.removeSpeaker(speaker.speakerName);
      // Also remove all linked schedule sessions for this speaker
      if (linkedScheduleSessions) {
        for (const session of linkedScheduleSessions) {
          if (session.speaker === speaker.speakerName) {
            await sessionStorage.removeSession(session.id);
          }
        }
      }
    } else {
      await sessionStorage.addSpeaker(speaker);
      // Also add all linked schedule sessions for this speaker
      if (linkedScheduleSessions) {
        for (const session of linkedScheduleSessions) {
          if (session.speaker === speaker.speakerName) {
            await sessionStorage.addSession(session);
          }
        }
      }
    }
    return !isSaved; // Return new state
  },

  // Get total count of saved items
  getTotalCount: (): number => {
    return savedSessions.length + savedSpeakers.length;
  },

  // Clear all saved items
  clearAll: async (): Promise<void> => {
    savedSessions = [];
    savedSpeakers = [];
    await Promise.all([saveSessions(), saveSpeakers()]);
    notifyListeners();
  },

  // Subscribe to changes
  subscribe: (listener: () => void): (() => void) => {
    listeners.push(listener);
    // Return unsubscribe function
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

// Notify all listeners of changes
function notifyListeners() {
  listeners.forEach((listener) => listener());
}
