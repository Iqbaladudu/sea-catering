'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import { TextStateIcon } from '../../lexical/ui/icons/TextState/index.js';
import { createClientFeature } from '../../utilities/createClientFeature.js';
import { registerTextStates, setTextState, StatePlugin } from './textState.js';
const toolbarGroups = props => {
  const items = [];
  for (const stateKey in props.state) {
    const key = props.state[stateKey];
    for (const stateValue in key) {
      const meta = key[stateValue];
      items.push({
        ChildComponent: () => /*#__PURE__*/_jsx(TextStateIcon, {
          css: meta.css
        }),
        key: stateValue,
        label: meta.label,
        onSelect: ({
          editor
        }) => {
          setTextState(editor, stateKey, stateValue);
        }
      });
    }
  }
  const clearStyle = [{
    ChildComponent: () => /*#__PURE__*/_jsx(TextStateIcon, {}),
    key: `clear-style`,
    label: 'Default style',
    onSelect: ({
      editor
    }) => {
      for (const stateKey in props.state) {
        setTextState(editor, stateKey, undefined);
      }
    },
    order: 1
  }];
  return [{
    type: 'dropdown',
    ChildComponent: () => /*#__PURE__*/_jsx(TextStateIcon, {
      css: {
        color: 'var(--theme-elevation-600)'
      }
    }),
    items: [...clearStyle, ...items],
    key: 'textState',
    order: 30
  }];
};
export const TextStateFeatureClient = createClientFeature(({
  props
}) => {
  registerTextStates(props.state);
  return {
    plugins: [{
      Component: StatePlugin,
      position: 'normal'
    }],
    toolbarFixed: {
      groups: toolbarGroups(props)
    },
    toolbarInline: {
      groups: toolbarGroups(props)
    }
  };
});
//# sourceMappingURL=feature.client.js.map