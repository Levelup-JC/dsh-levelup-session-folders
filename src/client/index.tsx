/**
 * Plugin entry: registers the right-sidebar tab type and its body slot.
 *
 * Client-side only. Session data comes from the framework's standard
 * `useSessions` / `useWorkspaces` props; navigation goes through
 * `ctx.uiWorkspace.openSession`.
 */
import type { ComponentType } from 'react'
import { NS, en, zh } from './i18n'
import { SessionGroupsPanel } from './panel'

export const name = 'dsh-levelup-session-folders'

export const inject = ['slots', 'locale', 'sidebarRightTabs', 'sessions', 'workspaces', 'uiWorkspace']

/** Implementation identity; also the keyed Slot dispatch key for the body. */
const ID = 'dsh-levelup-session-folders'
/** Page kind named by `openTab` and the guide entry. */
const KIND = 'session-groups'

function GuideIcon({ size = 16 }: { size?: number }): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.8 4.2a1 1 0 0 1 1-1h3.1l1.3 1.5h6a1 1 0 0 1 1 1v6.1a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1z" />
      <path d="M1.8 6.6h12.4" />
    </svg>
  )
}

export function apply(ctx: any): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-session-groups: copy')
  const t = ctx.locale.bind(NS)

  ctx.effect(
    () =>
      ctx.sidebarRightTabs.register({
        id: ID,
        kind: KIND,
        keepMounted: true,
        priority: 'extension',
        title: () => t('tab.title'),
        guide: [
          {
            id: 'open',
            order: 40,
            title: () => t('guide.title'),
            description: () => t('guide.description'),
            icon: GuideIcon as ComponentType<{ size?: number }>,
          },
        ],
      }),
    'dsh-session-groups: tab type',
  )

  ctx.effect(
    () =>
      ctx.slots.inject('sidebar.right.pane.tab', () =>
        ctx.slots.register(
          {
            name: 'sidebar.right.pane.tab',
            key: ID,
            locale: NS,
            inject: () => ({
              openSession: (sessionId: string) => ctx.uiWorkspace.openSession(sessionId),
            }),
          },
          SessionGroupsPanel,
        ),
      ),
    'dsh-session-groups: tab body',
  )
}
