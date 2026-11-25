/**
 * Group model and persistence.
 *
 * Groups are view state, not Session data: they live in localStorage keyed by
 * the current DSH profile's origin, exactly like other client-only preferences.
 */

export interface SessionGroup {
  id: string
  name: string
  /** Palette key, see GROUP_COLORS. */
  color: string
  /** Root group when undefined; nesting stops at one level. */
  parentId?: string
  collapsed?: boolean
}

export interface GroupState {
  /** Root and nested groups in drag order. */
  groups: SessionGroup[]
  /** sessionId -> groupId. A missing key means the session is ungrouped. */
  assignments: Record<string, string>
  /** Explicit session order inside a group; unknown members fall back to time order. */
  sessionOrder: Record<string, string[]>
}

export const STORAGE_KEY = 'dsh-session-groups:v1'

export const GROUP_COLORS = ['orange', 'blue', 'green', 'purple', 'pink', 'cyan', 'gray'] as const

export function emptyState(): GroupState {
  return { groups: [], assignments: {}, sessionOrder: {} }
}

export function newGroupId(): string {
  return 'g' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

function storage(): Storage | undefined {
  try {
    return globalThis.localStorage
  } catch {
    return undefined
  }
}

export function loadState(): GroupState {
  const store = storage()
  if (store === undefined) return emptyState()
  try {
    const raw = store.getItem(STORAGE_KEY)
    if (raw === null) return emptyState()
    const parsed = JSON.parse(raw) as Partial<GroupState>
    return {
      groups: Array.isArray(parsed.groups)
        ? parsed.groups.filter(group => typeof group?.id === 'string' && typeof group?.name === 'string')
        : [],
      assignments: typeof parsed.assignments === 'object' && parsed.assignments !== null ? parsed.assignments : {},
      sessionOrder:
        typeof parsed.sessionOrder === 'object' && parsed.sessionOrder !== null ? parsed.sessionOrder : {},
    }
  } catch {
    return emptyState()
  }
}

export function saveState(state: GroupState): void {
  const store = storage()
  if (store === undefined) return
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Quota or private mode: keeping the in-memory state is enough for this view.
  }
}

/** Root groups in order, each followed by its children in order. */
export function orderedTree(groups: readonly SessionGroup[]): SessionGroup[] {
  const roots = groups.filter(group => group.parentId === undefined)
  const out: SessionGroup[] = []
  for (const root of roots) {
    out.push(root)
    for (const child of groups) {
      if (child.parentId === root.id) out.push(child)
    }
  }
  // Orphans (parent deleted, stale storage) degrade to roots instead of vanishing.
  for (const group of groups) {
    if (!out.includes(group)) out.push(group)
  }
  return out
}

/** Depth of a group: 0 for roots, 1 for children. */
export function depthOf(groups: readonly SessionGroup[], group: SessionGroup): number {
  return group.parentId === undefined ? 0 : groups.some(g => g.id === group.parentId) ? 1 : 0
}

export function descendantsOf(groups: readonly SessionGroup[], id: string): SessionGroup[] {
  return groups.filter(group => group.parentId === id)
}

/** Sessions of a group in explicit order, newest-first fallback handled by the caller. */
export function orderSessions(
  state: GroupState,
  groupId: string,
  sessions: readonly string[],
  updatedAt: (id: string) => number,
): string[] {
  const explicit = state.sessionOrder[groupId] ?? []
  const members = sessions.filter(id => state.assignments[id] === groupId)
  const known = explicit.filter(id => members.includes(id))
  const rest = members
    .filter(id => !known.includes(id))
    .sort((a, b) => updatedAt(b) - updatedAt(a))
  return [...known, ...rest]
}
