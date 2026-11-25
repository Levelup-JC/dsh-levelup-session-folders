/** Panel copy, registered under the plugin's own locale namespace. */

export const NS = 'sessionGroups'

export const zh = {
  'tab.title': '会话分组',
  'guide.title': '会话分组',
  'guide.description': '按文件夹整理会话，拖拽排序与嵌套',
  'toolbar.title': '分组文件夹',
  'toolbar.new': '新建分组',
  'toolbar.collapseAll': '全部收起',
  'toolbar.expandAll': '全部展开',
  'empty.title': '还没有会话',
  'empty.hint': '新建一个会话后，会话会出现在这里。',
  'empty.groups': '还没有分组。点「新建分组」，再把会话拖进去。',
  'ungrouped': '未分组',
  'hint.drag': '拖动会话到分组；拖动分组标题可排序，拖到另一分组上可嵌套（最多两级）。',
  'menu.rename': '重命名',
  'menu.color': '颜色',
  'menu.delete': '删除分组',
  'menu.moveRoot': '移到根级',
  'menu.newChild': '新建子分组',
  'menu.ungroup': '移出分组',
  'menu.open': '打开会话',
  'group.defaultName': '新分组',
  'time.today': '今天',
}

export const en = {
  'tab.title': 'Session groups',
  'guide.title': 'Session groups',
  'guide.description': 'Organize sessions into folders with drag and nesting',
  'toolbar.title': 'Group folders',
  'toolbar.new': 'New group',
  'toolbar.collapseAll': 'Collapse all',
  'toolbar.expandAll': 'Expand all',
  'empty.title': 'No sessions yet',
  'empty.hint': 'Sessions appear here once you create one.',
  'empty.groups': 'No groups yet. Create one and drag sessions into it.',
  'ungrouped': 'Ungrouped',
  'hint.drag': 'Drag sessions into groups; drag a group header to reorder, or onto another group to nest (two levels).',
  'menu.rename': 'Rename',
  'menu.color': 'Color',
  'menu.delete': 'Delete group',
  'menu.moveRoot': 'Move to top level',
  'menu.newChild': 'New subgroup',
  'menu.ungroup': 'Remove from group',
  'menu.open': 'Open session',
  'group.defaultName': 'New group',
  'time.today': 'Today',
}

export type Dict = typeof zh
