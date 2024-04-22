type EventHandler = (...args: unknown[]) => void;

interface EventListeners {
  [eventName: string]: EventHandler[];
}

class EventEmitter {
  private events: EventListeners = {};

  on(eventName: string, listener: EventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName: string, ...args: unknown[]): void {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((listener) => {
        listener(...args);
      });
    }
  }

  off(eventName: string, listener: EventHandler): void {
    const listeners = this.events[eventName];
    if (listeners) {
      this.events[eventName] = listeners.filter((fn) => fn !== listener);
    }
  }
}

export const eventEmitter = new EventEmitter();
