'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { ContentEditable } from '@lexical/react/LexicalContentEditable.js';
import { useTranslation } from '@payloadcms/ui';
import * as React from 'react';
export function LexicalContentEditable(t0) {
  const $ = _c(7);
  const {
    className,
    editorConfig
  } = t0;
  const {
    t
  } = useTranslation();
  let t1;
  if ($[0] !== className || $[1] !== editorConfig?.admin?.placeholder || $[2] !== t) {
    let t2;
    if ($[4] !== editorConfig?.admin?.placeholder || $[5] !== t) {
      t2 = editorConfig?.admin?.placeholder ?? t("lexical:general:placeholder");
      $[4] = editorConfig?.admin?.placeholder;
      $[5] = t;
      $[6] = t2;
    } else {
      t2 = $[6];
    }
    t1 = _jsx(ContentEditable, {
      "aria-placeholder": t("lexical:general:placeholder"),
      className: className ?? "ContentEditable__root",
      placeholder: _jsx("p", {
        className: "editor-placeholder",
        children: t2
      })
    });
    $[0] = className;
    $[1] = editorConfig?.admin?.placeholder;
    $[2] = t;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  return t1;
}
//# sourceMappingURL=ContentEditable.js.map