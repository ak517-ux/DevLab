type Handler = (payload: unknown) => void;

const listeners: Record<string, Handler[]> = {};

export function on<T = unknown>(event: string, handler: (payload: T) => void) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(handler as Handler);
}

export function emit<T = unknown>(event: string, payload?: T) {
  (listeners[event] || []).forEach((h) => h(payload));
}
