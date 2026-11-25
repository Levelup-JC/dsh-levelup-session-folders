/** Panel styles. One scoped prefix, no global selectors, theme-aware via currentColor. */

export const STYLE_ELEMENT_ID = 'dsh-session-groups-style'

export const CSS = `
.dsg-root{display:flex;flex-direction:column;height:100%;min-height:0;font-size:13px;color:inherit}
.dsg-toolbar{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid color-mix(in srgb,currentColor 12%,transparent);flex:none}
.dsg-title{font-weight:600;font-size:12px;letter-spacing:.02em;opacity:.75;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsg-btn{display:inline-flex;align-items:center;gap:4px;border:1px solid color-mix(in srgb,currentColor 18%,transparent);background:transparent;color:inherit;border-radius:6px;padding:3px 8px;font-size:12px;cursor:pointer}
.dsg-btn:hover{background:color-mix(in srgb,currentColor 8%,transparent)}
.dsg-scroll{flex:1;min-height:0;overflow:auto;padding:8px}
.dsg-section{margin-bottom:6px}
.dsg-group{border-radius:8px;margin-bottom:6px;background:color-mix(in srgb,currentColor 4%,transparent)}
.dsg-group[data-drop=into]{outline:1px dashed var(--dsg-accent,#e8893a);outline-offset:-1px}
.dsg-group-header{display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:8px 8px 0 0;cursor:pointer;user-select:none}
.dsg-group-header:hover{background:color-mix(in srgb,currentColor 6%,transparent)}
.dsg-group[data-collapsed=true] .dsg-group-header{border-radius:8px}
.dsg-bar{width:3px;height:14px;border-radius:2px;background:var(--dsg-accent,#e8893a);flex:none}
.dsg-group-name{flex:1;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsg-count{font-size:11px;opacity:.55;font-variant-numeric:tabular-nums}
.dsg-chevron{width:14px;text-align:center;opacity:.6;flex:none;transition:transform .12s ease}
.dsg-group[data-collapsed=true] .dsg-chevron{transform:rotate(-90deg)}
.dsg-children{padding:0 6px 6px 12px}
.dsg-row{display:flex;align-items:center;gap:6px;padding:5px 6px;border-radius:6px;cursor:pointer;line-height:1.35}
.dsg-row:hover{background:color-mix(in srgb,currentColor 7%,transparent)}
.dsg-row[data-active=true]{background:color-mix(in srgb,currentColor 11%,transparent)}
.dsg-row-title{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsg-time{font-size:11px;opacity:.5;font-variant-numeric:tabular-nums;flex:none}
.dsg-dot{width:6px;height:6px;border-radius:50%;flex:none}
.dsg-dot[data-kind=running]{background:#3fb950;animation:dsg-pulse 1.4s ease-in-out infinite}
.dsg-dot[data-kind=unread]{background:#e8893a}
.dsg-dot[data-kind=pending]{background:#d29922}
@keyframes dsg-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.8)}}
@media (prefers-reduced-motion:reduce){.dsg-dot[data-kind=running]{animation:none}}
.dsg-empty{padding:24px 12px;text-align:center;opacity:.55;font-size:12px;line-height:1.6}
.dsg-input{border:1px solid var(--dsg-accent,#e8893a);background:transparent;color:inherit;border-radius:5px;padding:2px 6px;font-size:12px;width:100%;outline:none}
.dsg-menu{position:fixed;z-index:1000;min-width:150px;background:Canvas;color:CanvasText;border:1px solid color-mix(in srgb,currentColor 20%,transparent);border-radius:8px;padding:4px;box-shadow:0 8px 24px rgba(0,0,0,.18);font-size:12px}
.dsg-menu button{display:block;width:100%;text-align:left;border:0;background:transparent;color:inherit;padding:6px 8px;border-radius:5px;cursor:pointer;font-size:12px}
.dsg-menu button:hover{background:color-mix(in srgb,currentColor 10%,transparent)}
.dsg-menu hr{border:0;border-top:1px solid color-mix(in srgb,currentColor 12%,transparent);margin:4px 2px}
.dsg-colors{display:flex;gap:6px;padding:4px 8px 6px}
.dsg-swatch{width:14px;height:14px;border-radius:50%;border:2px solid transparent;cursor:pointer}
.dsg-swatch[data-on=true]{border-color:currentColor}
.dsg-hint{font-size:11px;opacity:.5;padding:4px 8px 8px}
`
