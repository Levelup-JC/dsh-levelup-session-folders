/**
 * The right-sidebar panel body.
 *
 * Props are the framework's standard shares plus the inject face:
 *   useSessions / useWorkspaces  — standing selector hooks from the slot framework
 *   openSession                  — injected callback (ctx.uiWorkspace.openSession)
 *   t                            — localized copy bound to the plugin namespace
 */
import { useEffect, useMemo, useState } from 'react'
import {
  GROUP_COLORS,
  emptyState,
  loadState,
  newGroupId,
  orderSessions,
  saveState,
  type GroupState,
  type SessionGroup,
} from './state'
import { CSS, STYLE_ELEMENT_ID } from './styles'

export interface PanelProps {
  sessionId?: string
  useSessions: (selector: (snapshot: any) => any) => any
  useWorkspaces: (selector: (snapshot: any) => any) => any
  openSession: (sessionId: string) => void
  t: (key: string) => string
}

const COLORS: Record<string, string> = {
  orange: '#e8893a',
  blue: '#4a9eff',
  green: '#3fb950',
  purple: '#a371f7',
  pink: '#e86ab8',
  cyan: '#39c5cf',
  gray: '#8b949e',
}

interface MenuState {
  x: number
  y: number
  kind: 'group' | 'session'
  id: string
  parentId?: string
}

interface DragState {
  kind: 'session' | 'group'
  id: string
  fromGroup?: string
}

export function SessionGroupsPanel(props: PanelProps): JSX.Element {
  const { sessionId, useSessions, useWorkspaces, openSession, t } = props
  const [state, setState] = useState<GroupState>(() => loadState())
  const [editing, setEditing] = useState<string | undefined>(undefined)
  const [draft, setDraft] = useState('')
  const [menu, setMenu] = useState<MenuState | undefined>(undefined)
  const [drag, setDrag] = useState<DragState | undefined>(undefined)
  const [dropTarget, setDropTarget] = useState<string | undefined>(undefined)

  const ids: string[] = useSessions((snapshot: any) => snapshot?.ids ?? snapshot?.items?.map((item: any) => item.sessionId) ?? [])
  const byId: Record<string, any> = useSessions((snapshot: any) => {
    if (snapshot?.byId !== undefined) return snapshot.byId
    const out: Record<string, any> = {}
    for (const item of snapshot?.items ?? []) {
      out[item.sessionId] = { id: item.sessionId, displayTitle: item.title ?? item.displayTitle, ...item }
    }
    return out
  })
  const archivedIds: string[] = useWorkspaces((snapshot: any) => snapshot?.archivedSessionIds ?? []) ?? []

  useEffect(() => saveState(state), [state])

  useEffect(() => {
    if (document.getElementById(STYLE_ELEMENT_ID) !== null) return
    const style = document.createElement('style')
    style.id = STYLE_ELEMENT_ID
    style.textContent = CSS
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    if (menu === undefined) return
    const close = (): void => setMenu(undefined)
    window.addEventListener('click', close)
    window.addEventListener('scroll', close, true)
    return () => {
      window.removeEventListener('click', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [menu])

  const visible = useMemo(() => {
    const archived = new Set(archivedIds)
    return ids.filter((id) => {
      if (archived.has(id)) return false
      const row = byId[id]
      if (row === undefined) return false
      if (row.blank === true) return false
      if (row.origin === 'subagent') return false
      return true
    })
  }, [ids, byId, archivedIds])

  const knownGroupIds = useMemo(() => new Set(state.groups.map(group => group.id)), [state.groups])

  const ungrouped = useMemo(
    () => visible.filter(id => state.assignments[id] === undefined || !knownGroupIds.has(state.assignments[id])),
    [visible, state.assignments, knownGroupIds],
  )

  const updatedAt = (id: string): number => byId[id]?.updatedAt ?? 0
  const titleOf = (id: string): string => byId[id]?.title ?? byId[id]?.displayTitle ?? id

  const roots = state.groups.filter(group => group.parentId === undefined)
  const childrenOf = (id: string): SessionGroup[] => state.groups.filter(group => group.parentId === id)

  function update(mutate: (draftState: GroupState) => void): void {
    setState((previous) => {
      const next: GroupState = {
        groups: [...previous.groups],
        assignments: { ...previous.assignments },
        sessionOrder: { ...previous.sessionOrder },
      }
      mutate(next)
      return next
    })
  }

  function addGroup(parentId?: string): void {
    const id = newGroupId()
    update((next) => {
      next.groups.push({ id, name: t('group.defaultName'), color: GROUP_COLORS[next.groups.length % GROUP_COLORS.length], ...(parentId === undefined ? {} : { parentId }) })
    })
    setEditing(id)
    setDraft(t('group.defaultName'))
  }

  function commitRename(): void {
    if (editing === undefined) return
    const name = draft.trim()
    update((next) => {
      const group = next.groups.find(item => item.id === editing)
      if (group !== undefined && name !== '') group.name = name
    })
    setEditing(undefined)
  }

  function assignSession(sessionIdToMove: string, groupId: string | undefined): void {
    update((next) => {
      if (groupId === undefined) delete next.assignments[sessionIdToMove]
      else next.assignments[sessionIdToMove] = groupId
    })
  }

  function moveSessionOrder(sessionIdToMove: string, groupId: string, beforeId?: string): void {
    update((next) => {
      next.assignments[sessionIdToMove] = groupId
      const order = (next.sessionOrder[groupId] ?? []).filter(id => id !== sessionIdToMove)
      if (beforeId !== undefined && beforeId !== sessionIdToMove) {
        const index = order.indexOf(beforeId)
        if (index >= 0) order.splice(index, 0, sessionIdToMove)
        else order.push(sessionIdToMove)
      } else {
        order.push(sessionIdToMove)
      }
      next.sessionOrder[groupId] = order
    })
  }

  function deleteGroup(id: string): void {
    update((next) => {
      const removed = new Set([id, ...next.groups.filter(group => group.parentId === id).map(group => group.id)])
      next.groups = next.groups.filter(group => !removed.has(group.id))
      for (const [session, group] of Object.entries(next.assignments)) {
        if (removed.has(group)) delete next.assignments[session]
      }
      for (const groupId of [...Object.keys(next.sessionOrder)]) {
        if (removed.has(groupId)) delete next.sessionOrder[groupId]
      }
    })
  }

  function reorderGroup(id: string, beforeId: string | undefined): void {
    if (id === beforeId) return
    update((next) => {
      const group = next.groups.find(item => item.id === id)
      const target = beforeId === undefined ? undefined : next.groups.find(item => item.id === beforeId)
      if (group === undefined) return
      group.parentId = target?.parentId
      next.groups = next.groups.filter(item => item.id !== id)
      const index = target === undefined ? next.groups.length : next.groups.indexOf(target)
      next.groups.splice(index, 0, group)
    })
  }

  function nestGroup(id: string, parentId: string): void {
    if (id === parentId) return
    if (state.groups.some(group => group.parentId === id)) return // a parent with children cannot become a child
    update((next) => {
      const group = next.groups.find(item => item.id === id)
      if (group !== undefined) group.parentId = parentId
    })
  }

  function toggleCollapsed(id: string): void {
    update((next) => {
      const group = next.groups.find(item => item.id === id)
      if (group !== undefined) group.collapsed = !group.collapsed
    })
  }

  function setColor(id: string, color: string): void {
    update((next) => {
      const group = next.groups.find(item => item.id === id)
      if (group !== undefined) group.color = color
    })
  }

  const setAllCollapsed = (collapsed: boolean): void => {
    update((next) => {
      for (const group of next.groups) group.collapsed = collapsed
    })
  }

  function renderSessionRow(id: string, groupId: string | undefined): JSX.Element {
    const row = byId[id] ?? {}
    const running = row.running === true
    return (
      <div
        key={id}
        className="dsg-row"
        data-active={sessionId === id}
        draggable
        onDragStart={(event) => {
          event.stopPropagation()
          event.dataTransfer.setData('text/plain', id)
          event.dataTransfer.effectAllowed = 'move'
          setDrag({ kind: 'session', id, fromGroup: groupId })
        }}
        onDragEnd={() => { setDrag(undefined); setDropTarget(undefined) }}
        onDragOver={(event) => {
          if (drag?.kind !== 'session' || groupId === undefined) return
          event.preventDefault()
          event.stopPropagation()
        }}
        onDrop={(event) => {
          if (drag?.kind !== 'session' || groupId === undefined) return
          event.preventDefault()
          event.stopPropagation()
          moveSessionOrder(drag.id, groupId, id)
          setDrag(undefined)
          setDropTarget(undefined)
        }}
        onClick={() => openSession(id)}
        onContextMenu={(event) => {
          event.preventDefault()
          setMenu({ x: event.clientX, y: event.clientY, kind: 'session', id, parentId: groupId })
        }}
        title={titleOf(id)}
      >
        {running ? <span className="dsg-dot" data-kind="running" /> : null}
        <span className="dsg-row-title">{titleOf(id)}</span>
        <span className="dsg-time">{formatTime(row.updatedAt)}</span>
      </div>
    )
  }

  function renderGroup(group: SessionGroup, depth: number): JSX.Element {
    const members = orderSessions(state, group.id, visible, updatedAt)
    const collapsed = group.collapsed === true
    return (
      <div
        key={group.id}
        className="dsg-group"
        data-collapsed={collapsed}
        data-drop={dropTarget === group.id ? 'into' : undefined}
        style={{ ['--dsg-accent' as any]: COLORS[group.color] ?? COLORS.orange }}
      >
        <div
          className="dsg-group-header"
          draggable
          onClick={() => toggleCollapsed(group.id)}
          onDoubleClick={(event) => {
            event.stopPropagation()
            setEditing(group.id)
            setDraft(group.name)
          }}
          onContextMenu={(event) => {
            event.preventDefault()
            setMenu({ x: event.clientX, y: event.clientY, kind: 'group', id: group.id })
          }}
          onDragStart={(event) => {
            event.stopPropagation()
            event.dataTransfer.setData('text/plain', group.id)
            setDrag({ kind: 'group', id: group.id })
          }}
          onDragEnd={() => { setDrag(undefined); setDropTarget(undefined) }}
          onDragOver={(event) => {
            if (drag === undefined) return
            event.preventDefault()
            event.stopPropagation()
            if (drag.kind === 'group' && drag.id !== group.id) setDropTarget(group.id)
            if (drag.kind === 'session') setDropTarget(group.id)
          }}
          onDrop={(event) => {
            event.preventDefault()
            event.stopPropagation()
            if (drag === undefined) return
            if (drag.kind === 'session') {
              const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
              if (event.clientY < rect.top + rect.height / 2) assignSession(drag.id, group.id)
              else moveSessionOrder(drag.id, group.id)
            } else if (drag.id !== group.id) {
              const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
              const relative = (event.clientY - rect.top) / rect.height
              if (relative < 0.3) reorderGroup(drag.id, group.id)
              else if (relative > 0.7) reorderGroup(drag.id, nextRootAfter(group.id))
              else nestGroup(drag.id, group.id)
            }
            setDrag(undefined)
            setDropTarget(undefined)
          }}
        >
          <span className="dsg-chevron">{collapsed ? '▸' : '▾'}</span>
          <span className="dsg-bar" />
          {editing === group.id ? (
            <input
              className="dsg-input"
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              onBlur={commitRename}
              onKeyDown={(event) => {
                if (event.key === 'Enter') commitRename()
                if (event.key === 'Escape') setEditing(undefined)
              }}
            />
          ) : (
            <span className="dsg-group-name">{group.name}</span>
          )}
          <span className="dsg-count">{members.length}</span>
        </div>
        {collapsed ? null : (
          <div className="dsg-children">
            {members.map(id => renderSessionRow(id, group.id))}
            {childrenOf(group.id).map(child => renderGroup(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  function nextRootAfter(id: string): string | undefined {
    const roots = state.groups.filter(group => group.parentId === undefined)
    const index = roots.findIndex(group => group.id === id)
    return index >= 0 && index + 1 < roots.length ? roots[index + 1].id : undefined
  }

  const menuGroup = menu?.kind === 'group' ? state.groups.find(group => group.id === menu.id) : undefined

  return (
    <div className="dsg-root">
      <div className="dsg-toolbar">
        <span className="dsg-title">{t('toolbar.title')}</span>
        <button className="dsg-btn" onClick={() => setAllCollapsed(true)} title={t('toolbar.collapseAll')}>−</button>
        <button className="dsg-btn" onClick={() => setAllCollapsed(false)} title={t('toolbar.expandAll')}>+</button>
        <button className="dsg-btn" onClick={() => addGroup()}>{t('toolbar.new')}</button>
      </div>
      <div className="dsg-scroll" onClick={() => setMenu(undefined)}>
        {visible.length === 0 ? (
          <div className="dsg-empty">{t('empty.title')}<br />{t('empty.hint')}</div>
        ) : roots.length === 0 ? (
          <div className="dsg-empty">{t('empty.groups')}</div>
        ) : null}

        {roots.map(group => renderGroup(group, 0))}

        {visible.length > 0 ? (
          <div
            className="dsg-section"
            onDragOver={(event) => {
              if (drag?.kind === 'session') {
                event.preventDefault()
                setDropTarget('__ungrouped__')
              }
            }}
            onDrop={(event) => {
              if (drag?.kind !== 'session') return
              event.preventDefault()
              assignSession(drag.id, undefined)
              setDrag(undefined)
              setDropTarget(undefined)
            }}
            data-drop={dropTarget === '__ungrouped__' ? 'into' : undefined}
          >
            <div className="dsg-group">
              <div className="dsg-group-header" style={{ ['--dsg-accent' as any]: COLORS.gray }}>
                <span className="dsg-chevron" />
                <span className="dsg-bar" />
                <span className="dsg-group-name">{t('ungrouped')}</span>
                <span className="dsg-count">{ungrouped.length}</span>
              </div>
              <div className="dsg-children">
                {ungrouped.map(id => renderSessionRow(id, undefined))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="dsg-hint">{t('hint.drag')}</div>
      </div>

      {menu !== undefined ? (
        <div className="dsg-menu" style={{ left: menu.x, top: menu.y }} onClick={(event) => event.stopPropagation()}>
          {menu.kind === 'session' ? (
            <>
              <button onClick={() => { openSession(menu.id); setMenu(undefined) }}>{t('menu.open')}</button>
              <button onClick={() => { assignSession(menu.id, undefined); setMenu(undefined) }}>{t('menu.ungroup')}</button>
            </>
          ) : (
            <>
              <button onClick={() => { setEditing(menu.id); setDraft(menuGroup?.name ?? ''); setMenu(undefined) }}>{t('menu.rename')}</button>
              <button onClick={() => { addGroup(menu.id); setMenu(undefined) }}>{t('menu.newChild')}</button>
              {menuGroup?.parentId !== undefined ? (
                <button onClick={() => { reorderGroup(menu.id, undefined); setMenu(undefined) }}>{t('menu.moveRoot')}</button>
              ) : null}
              <hr />
              <div className="dsg-colors">
                {GROUP_COLORS.map(color => (
                  <span
                    key={color}
                    className="dsg-swatch"
                    style={{ background: COLORS[color] }}
                    data-on={menuGroup?.color === color}
                    onClick={() => { setColor(menu.id, color); setMenu(undefined) }}
                  />
                ))}
              </div>
              <hr />
              <button onClick={() => { deleteGroup(menu.id); setMenu(undefined) }}>{t('menu.delete')}</button>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}

function formatTime(time: number | undefined): string {
  if (typeof time !== 'number' || time <= 0) return ''
  const date = new Date(time)
  const now = new Date()
  const pad = (value: number): string => String(value).padStart(2, '0')
  const clock = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  if (date.toDateString() === now.toDateString()) return clock
  if (date.getFullYear() === now.getFullYear()) return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${clock}`
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${clock}`
}
