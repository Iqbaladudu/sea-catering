'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { mergeRegister } from '@lexical/utils';
import { $addUpdateTag, $getSelection } from 'lexical';
import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js';
import { useRunDeprioritized } from '../../../../utilities/useRunDeprioritized.js';
const baseClass = 'toolbar-popup__button';
export const ToolbarButton = t0 => {
  const $ = _c(22);
  const {
    children,
    editor,
    item
  } = t0;
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      active: false,
      enabled: true
    };
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const [_state, setState] = useState(t1);
  const deferredState = useDeferredValue(_state);
  const editorConfigContext = useEditorConfigContext();
  let t2;
  const t3 = !deferredState.enabled ? "disabled" : "";
  const t4 = deferredState.active ? "active" : "";
  const t5 = item.key ? `${baseClass}-${item.key}` : "";
  let t6;
  if ($[1] !== t3 || $[2] !== t4 || $[3] !== t5) {
    t6 = [baseClass, t3, t4, t5].filter(Boolean);
    $[1] = t3;
    $[2] = t4;
    $[3] = t5;
    $[4] = t6;
  } else {
    t6 = $[4];
  }
  t2 = t6.join(" ");
  const className = t2;
  let t7;
  if ($[5] !== editor || $[6] !== editorConfigContext || $[7] !== item) {
    t7 = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if (!selection) {
          return;
        }
        const newActive = item.isActive ? item.isActive({
          editor,
          editorConfigContext,
          selection
        }) : false;
        const newEnabled = item.isEnabled ? item.isEnabled({
          editor,
          editorConfigContext,
          selection
        }) : true;
        setState(prev => {
          if (prev.active === newActive && prev.enabled === newEnabled) {
            return prev;
          }
          return {
            active: newActive,
            enabled: newEnabled
          };
        });
      });
    };
    $[5] = editor;
    $[6] = editorConfigContext;
    $[7] = item;
    $[8] = t7;
  } else {
    t7 = $[8];
  }
  const updateStates = t7;
  const runDeprioritized = useRunDeprioritized();
  let t8;
  let t9;
  if ($[9] !== editor || $[10] !== runDeprioritized || $[11] !== updateStates) {
    t8 = () => {
      const listener = () => runDeprioritized(updateStates);
      const cleanup = mergeRegister(editor.registerUpdateListener(listener));
      document.addEventListener("mouseup", listener);
      return () => {
        cleanup();
        document.removeEventListener("mouseup", listener);
      };
    };
    t9 = [editor, runDeprioritized, updateStates];
    $[9] = editor;
    $[10] = runDeprioritized;
    $[11] = updateStates;
    $[12] = t8;
    $[13] = t9;
  } else {
    t8 = $[12];
    t9 = $[13];
  }
  useEffect(t8, t9);
  let t10;
  if ($[14] !== _state || $[15] !== editor || $[16] !== item) {
    t10 = () => {
      if (!_state.enabled) {
        return;
      }
      editor.focus(() => {
        editor.update(_temp);
        item.onSelect?.({
          editor,
          isActive: _state.active
        });
      });
    };
    $[14] = _state;
    $[15] = editor;
    $[16] = item;
    $[17] = t10;
  } else {
    t10 = $[17];
  }
  const handleClick = t10;
  const handleMouseDown = _temp2;
  let t11;
  if ($[18] !== children || $[19] !== className || $[20] !== handleClick) {
    t11 = _jsx("button", {
      className,
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      type: "button",
      children
    });
    $[18] = children;
    $[19] = className;
    $[20] = handleClick;
    $[21] = t11;
  } else {
    t11 = $[21];
  }
  return t11;
};
function _temp() {
  $addUpdateTag("toolbar");
}
function _temp2(e) {
  e.preventDefault();
}
//# sourceMappingURL=index.js.map