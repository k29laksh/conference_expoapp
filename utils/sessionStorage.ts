// Simple in-memory storage for saved sessions
// Replace with AsyncStorage for persistence across app restarts

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

// In-memory storage (will persist during app session)
let savedSessions: ScheduleItem[] = [];
let savedSpeakers: SpeakerSession[] = [];
let listeners: (() => void)[] = [];

export const sessionStorage = {
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
  addSession: (session: ScheduleItem): void => {
    if (!sessionStorage.isSessionSaved(session.id)) {
      savedSessions.push(session);
      notifyListeners();
    }
  },

  // Remove session
  removeSession: (sessionId: string): void => {
    savedSessions = savedSessions.filter((s) => s.id !== sessionId);
    notifyListeners();
  },

  // Toggle session (add if not saved, remove if saved)
  toggleSession: (session: ScheduleItem): boolean => {
    const isSaved = sessionStorage.isSessionSaved(session.id);
    if (isSaved) {
      sessionStorage.removeSession(session.id);
      // Also remove linked speaker if exists
      if (session.speaker) {
        sessionStorage.removeSpeaker(session.speaker);
      }
    } else {
      sessionStorage.addSession(session);
      // Also add linked speaker if exists
      if (session.speaker) {
        const speakerSession: SpeakerSession = {
          id: `speaker-${session.speaker}`,
          speakerName: session.speaker,
          sessionTitle: session.title,
          time: session.time,
          day: session.day === 1 ? "Day-I" : "Day-II",
        };
        sessionStorage.addSpeaker(speakerSession);
      }
    }
    return !isSaved; // Return new state
  },

  // Add speaker session
  addSpeaker: (speaker: SpeakerSession): void => {
    if (!sessionStorage.isSpeakerSaved(speaker.speakerName)) {
      savedSpeakers.push(speaker);
      notifyListeners();
    }
  },

  // Remove speaker session
  removeSpeaker: (speakerName: string): void => {
    savedSpeakers = savedSpeakers.filter((s) => s.speakerName !== speakerName);
    notifyListeners();
  },

  // Toggle speaker (add if not saved, remove if saved)
  toggleSpeaker: (
    speaker: SpeakerSession,
    linkedScheduleSessions?: ScheduleItem[]
  ): boolean => {
    const isSaved = sessionStorage.isSpeakerSaved(speaker.speakerName);
    if (isSaved) {
      sessionStorage.removeSpeaker(speaker.speakerName);
      // Also remove all linked schedule sessions for this speaker
      if (linkedScheduleSessions) {
        linkedScheduleSessions.forEach((session) => {
          if (session.speaker === speaker.speakerName) {
            sessionStorage.removeSession(session.id);
          }
        });
      }
    } else {
      sessionStorage.addSpeaker(speaker);
      // Also add all linked schedule sessions for this speaker
      if (linkedScheduleSessions) {
        linkedScheduleSessions.forEach((session) => {
          if (session.speaker === speaker.speakerName) {
            sessionStorage.addSession(session);
          }
        });
      }
    }
    return !isSaved; // Return new state
  },

  // Get total count of saved items
  getTotalCount: (): number => {
    return savedSessions.length + savedSpeakers.length;
  },

  // Clear all saved items
  clearAll: (): void => {
    savedSessions = [];
    savedSpeakers = [];
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

// TODO: Replace with AsyncStorage implementation
// Example implementation with AsyncStorage:
/*
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSIONS_KEY = '@saved_sessions';
const SPEAKERS_KEY = '@saved_speakers';

export const sessionStorage = {
  getSavedSessions: async (): Promise<ScheduleItem[]> => {
    try {
      const data = await AsyncStorage.getItem(SESSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  },

  addSession: async (session: ScheduleItem): Promise<void> => {
    try {
      const sessions = await sessionStorage.getSavedSessions();
      const updated = [...sessions, session];
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
      notifyListeners();
    } catch (error) {
      console.error('Error saving session:', error);
    }
  },

  // ... similar implementations for other methods
};
*/
