window.__ModuleLoader__.load({ id: 'dsh-levelup-session-folders', factory: (require) => {
  const module = { exports: {} };
  (function (module, exports, require) {
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);

// src/client/i18n.ts
var NS = "sessionGroups";
var zh = {
  "tab.title": "\u4F1A\u8BDD\u5206\u7EC4",
  "guide.title": "\u4F1A\u8BDD\u5206\u7EC4",
  "guide.description": "\u6309\u6587\u4EF6\u5939\u6574\u7406\u4F1A\u8BDD\uFF0C\u62D6\u62FD\u6392\u5E8F\u4E0E\u5D4C\u5957",
  "toolbar.title": "\u5206\u7EC4\u6587\u4EF6\u5939",
  "toolbar.new": "\u65B0\u5EFA\u5206\u7EC4",
  "toolbar.collapseAll": "\u5168\u90E8\u6536\u8D77",
  "toolbar.expandAll": "\u5168\u90E8\u5C55\u5F00",
  "empty.title": "\u8FD8\u6CA1\u6709\u4F1A\u8BDD",
  "empty.hint": "\u65B0\u5EFA\u4E00\u4E2A\u4F1A\u8BDD\u540E\uFF0C\u4F1A\u8BDD\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",
  "empty.groups": "\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u65B0\u5EFA\u5206\u7EC4\u300D\uFF0C\u518D\u628A\u4F1A\u8BDD\u62D6\u8FDB\u53BB\u3002",
  "ungrouped": "\u672A\u5206\u7EC4",
  "hint.drag": "\u62D6\u52A8\u4F1A\u8BDD\u5230\u5206\u7EC4\uFF1B\u62D6\u52A8\u5206\u7EC4\u6807\u9898\u53EF\u6392\u5E8F\uFF0C\u62D6\u5230\u53E6\u4E00\u5206\u7EC4\u4E0A\u53EF\u5D4C\u5957\uFF08\u6700\u591A\u4E24\u7EA7\uFF09\u3002",
  "menu.rename": "\u91CD\u547D\u540D",
  "menu.color": "\u989C\u8272",
  "menu.delete": "\u5220\u9664\u5206\u7EC4",
  "menu.moveRoot": "\u79FB\u5230\u6839\u7EA7",
  "menu.newChild": "\u65B0\u5EFA\u5B50\u5206\u7EC4",
  "menu.ungroup": "\u79FB\u51FA\u5206\u7EC4",
  "menu.open": "\u6253\u5F00\u4F1A\u8BDD",
  "group.defaultName": "\u65B0\u5206\u7EC4",
  "time.today": "\u4ECA\u5929"
};
var en = {
  "tab.title": "Session groups",
  "guide.title": "Session groups",
  "guide.description": "Organize sessions into folders with drag and nesting",
  "toolbar.title": "Group folders",
  "toolbar.new": "New group",
  "toolbar.collapseAll": "Collapse all",
  "toolbar.expandAll": "Expand all",
  "empty.title": "No sessions yet",
  "empty.hint": "Sessions appear here once you create one.",
  "empty.groups": "No groups yet. Create one and drag sessions into it.",
  "ungrouped": "Ungrouped",
  "hint.drag": "Drag sessions into groups; drag a group header to reorder, or onto another group to nest (two levels).",
  "menu.rename": "Rename",
  "menu.color": "Color",
  "menu.delete": "Delete group",
  "menu.moveRoot": "Move to top level",
  "menu.newChild": "New subgroup",
  "menu.ungroup": "Remove from group",
  "menu.open": "Open session",
  "group.defaultName": "New group",
  "time.today": "Today"
};

// src/client/panel.tsx
var import_react = require("react");

// src/client/state.ts
var STORAGE_KEY = "dsh-session-groups:v1";
var GROUP_COLORS = ["orange", "blue", "green", "purple", "pink", "cyan", "gray"];
function emptyState() {
  return { groups: [], assignments: {}, sessionOrder: {} };
}
function newGroupId() {
  return "g" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
function storage() {
  try {
    return globalThis.localStorage;
  } catch {
    return void 0;
  }
}
function loadState() {
  const store = storage();
  if (store === void 0) return emptyState();
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (raw === null) return emptyState();
    const parsed = JSON.parse(raw);
    return {
      groups: Array.isArray(parsed.groups) ? parsed.groups.filter((group) => typeof group?.id === "string" && typeof group?.name === "string") : [],
      assignments: typeof parsed.assignments === "object" && parsed.assignments !== null ? parsed.assignments : {},
      sessionOrder: typeof parsed.sessionOrder === "object" && parsed.sessionOrder !== null ? parsed.sessionOrder : {}
    };
  } catch {
    return emptyState();
  }
}
function saveState(state) {
  const store = storage();
  if (store === void 0) return;
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
  }
}
function orderSessions(state, groupId, sessions, updatedAt) {
  const explicit = state.sessionOrder[groupId] ?? [];
  const members = sessions.filter((id) => state.assignments[id] === groupId);
  const known = explicit.filter((id) => members.includes(id));
  const rest = members.filter((id) => !known.includes(id)).sort((a, b) => updatedAt(b) - updatedAt(a));
  return [...known, ...rest];
}

// src/client/styles.ts
var STYLE_ELEMENT_ID = "dsh-session-groups-style";
var CSS = `
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
`;

// src/client/panel.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var COLORS = {
  orange: "#e8893a",
  blue: "#4a9eff",
  green: "#3fb950",
  purple: "#a371f7",
  pink: "#e86ab8",
  cyan: "#39c5cf",
  gray: "#8b949e"
};
function SessionGroupsPanel(props) {
  const { sessionId, useSessions, useWorkspaces, openSession, t } = props;
  const [state, setState] = (0, import_react.useState)(() => loadState());
  const [editing, setEditing] = (0, import_react.useState)(void 0);
  const [draft, setDraft] = (0, import_react.useState)("");
  const [menu, setMenu] = (0, import_react.useState)(void 0);
  const [drag, setDrag] = (0, import_react.useState)(void 0);
  const [dropTarget, setDropTarget] = (0, import_react.useState)(void 0);
  const ids = useSessions((snapshot) => snapshot?.ids ?? snapshot?.items?.map((item) => item.sessionId) ?? []);
  const byId = useSessions((snapshot) => {
    if (snapshot?.byId !== void 0) return snapshot.byId;
    const out = {};
    for (const item of snapshot?.items ?? []) {
      out[item.sessionId] = { id: item.sessionId, displayTitle: item.title ?? item.displayTitle, ...item };
    }
    return out;
  });
  const archivedIds = useWorkspaces((snapshot) => snapshot?.archivedSessionIds ?? []) ?? [];
  (0, import_react.useEffect)(() => saveState(state), [state]);
  (0, import_react.useEffect)(() => {
    if (document.getElementById(STYLE_ELEMENT_ID) !== null) return;
    const style = document.createElement("style");
    style.id = STYLE_ELEMENT_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }, []);
  (0, import_react.useEffect)(() => {
    if (menu === void 0) return;
    const close = () => setMenu(void 0);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [menu]);
  const visible = (0, import_react.useMemo)(() => {
    const archived = new Set(archivedIds);
    return ids.filter((id) => {
      if (archived.has(id)) return false;
      const row = byId[id];
      if (row === void 0) return false;
      if (row.blank === true) return false;
      if (row.origin === "subagent") return false;
      return true;
    });
  }, [ids, byId, archivedIds]);
  const knownGroupIds = (0, import_react.useMemo)(() => new Set(state.groups.map((group) => group.id)), [state.groups]);
  const ungrouped = (0, import_react.useMemo)(
    () => visible.filter((id) => state.assignments[id] === void 0 || !knownGroupIds.has(state.assignments[id])),
    [visible, state.assignments, knownGroupIds]
  );
  const updatedAt = (id) => byId[id]?.updatedAt ?? 0;
  const titleOf = (id) => byId[id]?.title ?? byId[id]?.displayTitle ?? id;
  const roots = state.groups.filter((group) => group.parentId === void 0);
  const childrenOf = (id) => state.groups.filter((group) => group.parentId === id);
  function update(mutate) {
    setState((previous) => {
      const next = {
        groups: [...previous.groups],
        assignments: { ...previous.assignments },
        sessionOrder: { ...previous.sessionOrder }
      };
      mutate(next);
      return next;
    });
  }
  function addGroup(parentId) {
    const id = newGroupId();
    update((next) => {
      next.groups.push({ id, name: t("group.defaultName"), color: GROUP_COLORS[next.groups.length % GROUP_COLORS.length], ...parentId === void 0 ? {} : { parentId } });
    });
    setEditing(id);
    setDraft(t("group.defaultName"));
  }
  function commitRename() {
    if (editing === void 0) return;
    const name2 = draft.trim();
    update((next) => {
      const group = next.groups.find((item) => item.id === editing);
      if (group !== void 0 && name2 !== "") group.name = name2;
    });
    setEditing(void 0);
  }
  function assignSession(sessionIdToMove, groupId) {
    update((next) => {
      if (groupId === void 0) delete next.assignments[sessionIdToMove];
      else next.assignments[sessionIdToMove] = groupId;
    });
  }
  function moveSessionOrder(sessionIdToMove, groupId, beforeId) {
    update((next) => {
      next.assignments[sessionIdToMove] = groupId;
      const order = (next.sessionOrder[groupId] ?? []).filter((id) => id !== sessionIdToMove);
      if (beforeId !== void 0 && beforeId !== sessionIdToMove) {
        const index = order.indexOf(beforeId);
        if (index >= 0) order.splice(index, 0, sessionIdToMove);
        else order.push(sessionIdToMove);
      } else {
        order.push(sessionIdToMove);
      }
      next.sessionOrder[groupId] = order;
    });
  }
  function deleteGroup(id) {
    update((next) => {
      const removed = /* @__PURE__ */ new Set([id, ...next.groups.filter((group) => group.parentId === id).map((group) => group.id)]);
      next.groups = next.groups.filter((group) => !removed.has(group.id));
      for (const [session, group] of Object.entries(next.assignments)) {
        if (removed.has(group)) delete next.assignments[session];
      }
      for (const groupId of [...Object.keys(next.sessionOrder)]) {
        if (removed.has(groupId)) delete next.sessionOrder[groupId];
      }
    });
  }
  function reorderGroup(id, beforeId) {
    if (id === beforeId) return;
    update((next) => {
      const group = next.groups.find((item) => item.id === id);
      const target = beforeId === void 0 ? void 0 : next.groups.find((item) => item.id === beforeId);
      if (group === void 0) return;
      group.parentId = target?.parentId;
      next.groups = next.groups.filter((item) => item.id !== id);
      const index = target === void 0 ? next.groups.length : next.groups.indexOf(target);
      next.groups.splice(index, 0, group);
    });
  }
  function nestGroup(id, parentId) {
    if (id === parentId) return;
    if (state.groups.some((group) => group.parentId === id)) return;
    update((next) => {
      const group = next.groups.find((item) => item.id === id);
      if (group !== void 0) group.parentId = parentId;
    });
  }
  function toggleCollapsed(id) {
    update((next) => {
      const group = next.groups.find((item) => item.id === id);
      if (group !== void 0) group.collapsed = !group.collapsed;
    });
  }
  function setColor(id, color) {
    update((next) => {
      const group = next.groups.find((item) => item.id === id);
      if (group !== void 0) group.color = color;
    });
  }
  const setAllCollapsed = (collapsed) => {
    update((next) => {
      for (const group of next.groups) group.collapsed = collapsed;
    });
  };
  function renderSessionRow(id, groupId) {
    const row = byId[id] ?? {};
    const running = row.running === true;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "dsg-row",
        "data-active": sessionId === id,
        draggable: true,
        onDragStart: (event) => {
          event.stopPropagation();
          event.dataTransfer.setData("text/plain", id);
          event.dataTransfer.effectAllowed = "move";
          setDrag({ kind: "session", id, fromGroup: groupId });
        },
        onDragEnd: () => {
          setDrag(void 0);
          setDropTarget(void 0);
        },
        onDragOver: (event) => {
          if (drag?.kind !== "session" || groupId === void 0) return;
          event.preventDefault();
          event.stopPropagation();
        },
        onDrop: (event) => {
          if (drag?.kind !== "session" || groupId === void 0) return;
          event.preventDefault();
          event.stopPropagation();
          moveSessionOrder(drag.id, groupId, id);
          setDrag(void 0);
          setDropTarget(void 0);
        },
        onClick: () => openSession(id),
        onContextMenu: (event) => {
          event.preventDefault();
          setMenu({ x: event.clientX, y: event.clientY, kind: "session", id, parentId: groupId });
        },
        title: titleOf(id),
        children: [
          running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-dot", "data-kind": "running" }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-row-title", children: titleOf(id) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-time", children: formatTime(row.updatedAt) })
        ]
      },
      id
    );
  }
  function renderGroup(group, depth) {
    const members = orderSessions(state, group.id, visible, updatedAt);
    const collapsed = group.collapsed === true;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "dsg-group",
        "data-collapsed": collapsed,
        "data-drop": dropTarget === group.id ? "into" : void 0,
        style: { ["--dsg-accent"]: COLORS[group.color] ?? COLORS.orange },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: "dsg-group-header",
              draggable: true,
              onClick: () => toggleCollapsed(group.id),
              onDoubleClick: (event) => {
                event.stopPropagation();
                setEditing(group.id);
                setDraft(group.name);
              },
              onContextMenu: (event) => {
                event.preventDefault();
                setMenu({ x: event.clientX, y: event.clientY, kind: "group", id: group.id });
              },
              onDragStart: (event) => {
                event.stopPropagation();
                event.dataTransfer.setData("text/plain", group.id);
                setDrag({ kind: "group", id: group.id });
              },
              onDragEnd: () => {
                setDrag(void 0);
                setDropTarget(void 0);
              },
              onDragOver: (event) => {
                if (drag === void 0) return;
                event.preventDefault();
                event.stopPropagation();
                if (drag.kind === "group" && drag.id !== group.id) setDropTarget(group.id);
                if (drag.kind === "session") setDropTarget(group.id);
              },
              onDrop: (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (drag === void 0) return;
                if (drag.kind === "session") {
                  const rect = event.currentTarget.getBoundingClientRect();
                  if (event.clientY < rect.top + rect.height / 2) assignSession(drag.id, group.id);
                  else moveSessionOrder(drag.id, group.id);
                } else if (drag.id !== group.id) {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const relative = (event.clientY - rect.top) / rect.height;
                  if (relative < 0.3) reorderGroup(drag.id, group.id);
                  else if (relative > 0.7) reorderGroup(drag.id, nextRootAfter(group.id));
                  else nestGroup(drag.id, group.id);
                }
                setDrag(void 0);
                setDropTarget(void 0);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-chevron", children: collapsed ? "\u25B8" : "\u25BE" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-bar" }),
                editing === group.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    className: "dsg-input",
                    autoFocus: true,
                    value: draft,
                    onChange: (event) => setDraft(event.target.value),
                    onClick: (event) => event.stopPropagation(),
                    onBlur: commitRename,
                    onKeyDown: (event) => {
                      if (event.key === "Enter") commitRename();
                      if (event.key === "Escape") setEditing(void 0);
                    }
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-group-name", children: group.name }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-count", children: members.length })
              ]
            }
          ),
          collapsed ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsg-children", children: [
            members.map((id) => renderSessionRow(id, group.id)),
            childrenOf(group.id).map((child) => renderGroup(child, depth + 1))
          ] })
        ]
      },
      group.id
    );
  }
  function nextRootAfter(id) {
    const roots2 = state.groups.filter((group) => group.parentId === void 0);
    const index = roots2.findIndex((group) => group.id === id);
    return index >= 0 && index + 1 < roots2.length ? roots2[index + 1].id : void 0;
  }
  const menuGroup = menu?.kind === "group" ? state.groups.find((group) => group.id === menu.id) : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsg-root", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsg-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-title", children: t("toolbar.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsg-btn", onClick: () => setAllCollapsed(true), title: t("toolbar.collapseAll"), children: "\u2212" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsg-btn", onClick: () => setAllCollapsed(false), title: t("toolbar.expandAll"), children: "+" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsg-btn", onClick: () => addGroup(), children: t("toolbar.new") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsg-scroll", onClick: () => setMenu(void 0), children: [
      visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsg-empty", children: [
        t("empty.title"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
        t("empty.hint")
      ] }) : roots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsg-empty", children: t("empty.groups") }) : null,
      roots.map((group) => renderGroup(group, 0)),
      visible.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "dsg-section",
          onDragOver: (event) => {
            if (drag?.kind === "session") {
              event.preventDefault();
              setDropTarget("__ungrouped__");
            }
          },
          onDrop: (event) => {
            if (drag?.kind !== "session") return;
            event.preventDefault();
            assignSession(drag.id, void 0);
            setDrag(void 0);
            setDropTarget(void 0);
          },
          "data-drop": dropTarget === "__ungrouped__" ? "into" : void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsg-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsg-group-header", style: { ["--dsg-accent"]: COLORS.gray }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-chevron" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-bar" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-group-name", children: t("ungrouped") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsg-count", children: ungrouped.length })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsg-children", children: ungrouped.map((id) => renderSessionRow(id, void 0)) })
          ] })
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsg-hint", children: t("hint.drag") })
    ] }),
    menu !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsg-menu", style: { left: menu.x, top: menu.y }, onClick: (event) => event.stopPropagation(), children: menu.kind === "session" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
        openSession(menu.id);
        setMenu(void 0);
      }, children: t("menu.open") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
        assignSession(menu.id, void 0);
        setMenu(void 0);
      }, children: t("menu.ungroup") })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
        setEditing(menu.id);
        setDraft(menuGroup?.name ?? "");
        setMenu(void 0);
      }, children: t("menu.rename") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
        addGroup(menu.id);
        setMenu(void 0);
      }, children: t("menu.newChild") }),
      menuGroup?.parentId !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
        reorderGroup(menu.id, void 0);
        setMenu(void 0);
      }, children: t("menu.moveRoot") }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsg-colors", children: GROUP_COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "span",
        {
          className: "dsg-swatch",
          style: { background: COLORS[color] },
          "data-on": menuGroup?.color === color,
          onClick: () => {
            setColor(menu.id, color);
            setMenu(void 0);
          }
        },
        color
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
        deleteGroup(menu.id);
        setMenu(void 0);
      }, children: t("menu.delete") })
    ] }) }) : null
  ] });
}
function formatTime(time) {
  if (typeof time !== "number" || time <= 0) return "";
  const date = new Date(time);
  const now = /* @__PURE__ */ new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const clock = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  if (date.toDateString() === now.toDateString()) return clock;
  if (date.getFullYear() === now.getFullYear()) return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${clock}`;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${clock}`;
}

// src/client/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var name = "dsh-levelup-session-folders";
var inject = ["slots", "locale", "sidebarRightTabs", "sessions", "workspaces", "uiWorkspace"];
var ID = "dsh-levelup-session-folders";
var KIND = "session-groups";
function GuideIcon({ size = 16 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M1.8 4.2a1 1 0 0 1 1-1h3.1l1.3 1.5h6a1 1 0 0 1 1 1v6.1a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1z" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M1.8 6.6h12.4" })
      ]
    }
  );
}
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-session-groups: copy");
  const t = ctx.locale.bind(NS);
  ctx.effect(
    () => ctx.sidebarRightTabs.register({
      id: ID,
      kind: KIND,
      keepMounted: true,
      priority: "extension",
      title: () => t("tab.title"),
      guide: [
        {
          id: "open",
          order: 40,
          title: () => t("guide.title"),
          description: () => t("guide.description"),
          icon: GuideIcon
        }
      ]
    }),
    "dsh-session-groups: tab type"
  );
  ctx.effect(
    () => ctx.slots.inject(
      "sidebar.right.pane.tab",
      () => ctx.slots.register(
        {
          name: "sidebar.right.pane.tab",
          key: ID,
          locale: NS,
          inject: () => ({
            openSession: (sessionId) => ctx.uiWorkspace.openSession(sessionId)
          })
        },
        SessionGroupsPanel
      )
    ),
    "dsh-session-groups: tab body"
  );
}

  })(module, module.exports, require);
  return module.exports;
} });
