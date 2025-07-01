'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useDeferredValue, useEffect, useMemo } from 'react';
const baseClass = 'toolbar-popup__dropdown';
import { mergeRegister } from '@lexical/utils';
import { useTranslation } from '@payloadcms/ui';
import { $getSelection } from 'lexical';
import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js';
import { useRunDeprioritized } from '../../../../utilities/useRunDeprioritized.js';
import { DropDown, DropDownItem } from './DropDown.js';
const ToolbarItem = t0 => {
  const $ = _c(18);
  const {
    active,
    anchorElem,
    editor,
    enabled,
    item
  } = t0;
  const {
    i18n
  } = useTranslation();
  const {
    fieldProps: t1
  } = useEditorConfigContext();
  const {
    featureClientSchemaMap,
    schemaPath
  } = t1;
  if (item.Component) {
    let t2;
    if ($[0] !== active || $[1] !== anchorElem || $[2] !== editor || $[3] !== enabled || $[4] !== item) {
      t2 = item?.Component && _jsx(item.Component, {
        active,
        anchorElem,
        editor,
        enabled,
        item
      }, item.key);
      $[0] = active;
      $[1] = anchorElem;
      $[2] = editor;
      $[3] = enabled;
      $[4] = item;
      $[5] = t2;
    } else {
      t2 = $[5];
    }
    return t2;
  }
  let title = item.key;
  let croppedTitle;
  if (item.label) {
    let t2;
    if ($[6] !== featureClientSchemaMap || $[7] !== i18n || $[8] !== item || $[9] !== schemaPath) {
      t2 = typeof item.label === "function" ? item.label({
        featureClientSchemaMap,
        i18n,
        schemaPath
      }) : item.label;
      $[6] = featureClientSchemaMap;
      $[7] = i18n;
      $[8] = item;
      $[9] = schemaPath;
      $[10] = t2;
    } else {
      t2 = $[10];
    }
    title = t2;
  }
  if (title.length > 25) {
    croppedTitle = title.substring(0, 25) + "...";
  } else {
    croppedTitle = title;
  }
  let t2;
  if ($[11] !== active || $[12] !== croppedTitle || $[13] !== editor || $[14] !== enabled || $[15] !== item || $[16] !== title) {
    t2 = _jsx(DropDownItem, {
      active,
      editor,
      enabled,
      Icon: item?.ChildComponent ? _jsx(item.ChildComponent, {}) : undefined,
      item,
      tooltip: title,
      children: _jsx("span", {
        className: "text",
        children: croppedTitle
      })
    }, item.key);
    $[11] = active;
    $[12] = croppedTitle;
    $[13] = editor;
    $[14] = enabled;
    $[15] = item;
    $[16] = title;
    $[17] = t2;
  } else {
    t2 = $[17];
  }
  return t2;
};
const MemoToolbarItem = /*#__PURE__*/React.memo(ToolbarItem);
export const ToolbarDropdown = ({
  anchorElem,
  classNames,
  editor,
  group,
  Icon,
  itemsContainerClassNames,
  label,
  maxActiveItems,
  onActiveChange
}) => {
  const [toolbarState, setToolbarState] = React.useState({
    activeItemKeys: [],
    enabledGroup: true,
    enabledItemKeys: []
  });
  const deferredToolbarState = useDeferredValue(toolbarState);
  const editorConfigContext = useEditorConfigContext();
  const {
    items,
    key: groupKey
  } = group;
  const runDeprioritized = useRunDeprioritized();
  const updateStates = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!selection) {
        return;
      }
      const _activeItemKeys = [];
      const _activeItems = [];
      const _enabledItemKeys = [];
      for (const item of items) {
        if (item.isActive && (!maxActiveItems || _activeItemKeys.length < maxActiveItems)) {
          const isActive = item.isActive({
            editor,
            editorConfigContext,
            selection
          });
          if (isActive) {
            _activeItemKeys.push(item.key);
            _activeItems.push(item);
          }
        }
        if (item.isEnabled) {
          const isEnabled = item.isEnabled({
            editor,
            editorConfigContext,
            selection
          });
          if (isEnabled) {
            _enabledItemKeys.push(item.key);
          }
        } else {
          _enabledItemKeys.push(item.key);
        }
      }
      setToolbarState({
        activeItemKeys: _activeItemKeys,
        enabledGroup: group.isEnabled ? group.isEnabled({
          editor,
          editorConfigContext,
          selection
        }) : true,
        enabledItemKeys: _enabledItemKeys
      });
      if (onActiveChange) {
        onActiveChange({
          activeItems: _activeItems
        });
      }
    });
  }, [editor, editorConfigContext, group, items, maxActiveItems, onActiveChange]);
  useEffect(() => {
    return mergeRegister(editor.registerUpdateListener(async () => {
      await runDeprioritized(updateStates);
    }));
  }, [editor, runDeprioritized, updateStates]);
  const renderedItems = useMemo(() => {
    return items?.length ? items.map(item_0 => /*#__PURE__*/_jsx(MemoToolbarItem, {
      active: deferredToolbarState.activeItemKeys.includes(item_0.key),
      anchorElem: anchorElem,
      editor: editor,
      enabled: deferredToolbarState.enabledItemKeys.includes(item_0.key),
      item: item_0
    }, item_0.key)) : null;
  }, [items, deferredToolbarState, anchorElem, editor]);
  return /*#__PURE__*/_jsx(DropDown, {
    buttonAriaLabel: `${groupKey} dropdown`,
    buttonClassName: [baseClass, `${baseClass}-${groupKey}`, ...(classNames || [])].filter(Boolean).join(' '),
    disabled: !deferredToolbarState.enabledGroup,
    Icon: Icon,
    itemsContainerClassNames: [`${baseClass}-items`, ...(itemsContainerClassNames || [])],
    label: label,
    children: renderedItems
  }, groupKey);
};
//# sourceMappingURL=index.js.map