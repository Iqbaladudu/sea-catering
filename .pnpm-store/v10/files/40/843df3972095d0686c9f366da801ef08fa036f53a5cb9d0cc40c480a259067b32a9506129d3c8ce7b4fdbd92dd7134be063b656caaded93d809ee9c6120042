'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils';
import { useConfig } from '@payloadcms/ui';
import { $getPreviousSelection, $getSelection, $isParagraphNode, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import React, { useEffect } from 'react';
import { UploadDrawer } from '../drawer/index.js';
import { $createUploadNode, UploadNode } from '../nodes/UploadNode.js';
export const INSERT_UPLOAD_COMMAND = createCommand('INSERT_UPLOAD_COMMAND');
export const UploadPlugin = t0 => {
  const $ = _c(5);
  const [editor] = useLexicalComposerContext();
  const {
    config: t1
  } = useConfig();
  const {
    collections
  } = t1;
  let t2;
  let t3;
  if ($[0] !== editor) {
    t2 = () => {
      if (!editor.hasNodes([UploadNode])) {
        throw new Error("UploadPlugin: UploadNode not registered on editor");
      }
      return mergeRegister(editor.registerCommand(INSERT_UPLOAD_COMMAND, payload => {
        editor.update(() => {
          const selection = $getSelection() || $getPreviousSelection();
          if ($isRangeSelection(selection)) {
            const uploadNode = $createUploadNode({
              data: {
                id: payload.id,
                fields: payload.fields,
                relationTo: payload.relationTo,
                value: payload.value
              }
            });
            const {
              focus
            } = selection;
            const focusNode = focus.getNode();
            $insertNodeToNearestRoot(uploadNode);
            if ($isParagraphNode(focusNode) && !focusNode.__first) {
              focusNode.remove();
            }
          }
        });
        return true;
      }, COMMAND_PRIORITY_EDITOR));
    };
    t3 = [editor];
    $[0] = editor;
    $[1] = t2;
    $[2] = t3;
  } else {
    t2 = $[1];
    t3 = $[2];
  }
  useEffect(t2, t3);
  let t4;
  if ($[3] !== collections) {
    t4 = _jsx(UploadDrawer, {
      enabledCollectionSlugs: collections.map(_temp)
    });
    $[3] = collections;
    $[4] = t4;
  } else {
    t4 = $[4];
  }
  return t4;
};
function _temp(t0) {
  const {
    slug
  } = t0;
  return slug;
}
//# sourceMappingURL=index.js.map