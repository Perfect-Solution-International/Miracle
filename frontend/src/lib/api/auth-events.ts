/**
 * Decouples the API layer from React. The client emits `session-expired`; the
 * auth provider subscribes and clears state, avoiding an import cycle between
 * the transport layer and the component tree.
 */
export type AuthEvent = "session-expired" | "session-refreshed";

type Listener = (event: AuthEvent) => void;

const listeners = new Set<Listener>();

export function onAuthEvent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitAuthEvent(event: AuthEvent): void {
  for (const listener of listeners) listener(event);
}
