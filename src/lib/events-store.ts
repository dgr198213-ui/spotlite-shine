// Events store with auto-expiration logic
// Events are free for max 1 month OR until event end date (whichever comes first)

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdAt: string; // ISO date string
  creatorName: string;
  creatorEmail: string;
  location?: string;
  category?: string;
}

const STORAGE_KEY = "escenika_events";
const MAX_DAYS = 30; // Maximum 1 month

export function getEvents(): Event[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const events: Event[] = JSON.parse(stored);
    const now = new Date();
    
    // Filter out expired events (ended or older than 30 days)
    const validEvents = events.filter((event) => {
      const endDate = new Date(event.endDate);
      const createdAt = new Date(event.createdAt);
      const daysSinceCreation = Math.floor(
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Event is valid if: not ended AND not older than 30 days
      return endDate >= now && daysSinceCreation < MAX_DAYS;
    });
    
    // If we filtered any, save the cleaned list
    if (validEvents.length !== events.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validEvents));
    }
    
    return validEvents;
  } catch {
    return [];
  }
}

export function addEvent(event: Omit<Event, "id" | "createdAt">): Event {
  const events = getEvents();
  
  const newEvent: Event = {
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  events.push(newEvent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  
  return newEvent;
}

export function deleteEvent(id: string): void {
  const events = getEvents();
  const filtered = events.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getEventById(id: string): Event | undefined {
  const events = getEvents();
  return events.find((e) => e.id === id);
}

// Get upcoming events (starting in the future or happening now)
export function getUpcomingEvents(): Event[] {
  const events = getEvents();
  const now = new Date();
  
  return events
    .filter((event) => new Date(event.endDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

// Calculate days remaining for an event
export function getDaysRemaining(event: Event): { daysUntilEnd: number; daysUntilExpiry: number } {
  const now = new Date();
  const endDate = new Date(event.endDate);
  const createdAt = new Date(event.createdAt);
  
  const daysUntilEnd = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );
  
  const daysSinceCreation = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysUntilExpiry = Math.max(0, MAX_DAYS - daysSinceCreation);
  
  return { daysUntilEnd, daysUntilExpiry };
}
