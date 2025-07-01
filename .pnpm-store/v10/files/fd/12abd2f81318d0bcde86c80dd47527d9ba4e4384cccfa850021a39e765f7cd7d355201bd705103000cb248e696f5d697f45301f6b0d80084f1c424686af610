'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShimmerEffect, useAllFormFields, useDocumentEvents, useLocale } from '@payloadcms/ui';
import { reduceFieldsToValues } from 'payload/shared';
import React, { useEffect } from 'react';
import { useLivePreviewContext } from '../Context/context.js';
import { DeviceContainer } from '../Device/index.js';
import { IFrame } from '../IFrame/index.js';
import { LivePreviewToolbar } from '../Toolbar/index.js';
const baseClass = 'live-preview-window';
export const LivePreview = props => {
  const $ = _c(41);
  const {
    appIsReady,
    iframeHasLoaded,
    iframeRef,
    popupRef,
    previewWindowType,
    setIframeHasLoaded,
    url
  } = useLivePreviewContext();
  const locale = useLocale();
  const {
    mostRecentUpdate
  } = useDocumentEvents();
  const {
    breakpoint,
    fieldSchemaJSON
  } = useLivePreviewContext();
  const prevWindowType = React.useRef(undefined);
  const [fields] = useAllFormFields();
  let t0;
  if ($[0] !== appIsReady || $[1] !== fieldSchemaJSON || $[2] !== fields || $[3] !== iframeRef || $[4] !== locale || $[5] !== mostRecentUpdate || $[6] !== popupRef || $[7] !== previewWindowType || $[8] !== url) {
    t0 = () => {
      if (fields && window && "postMessage" in window && appIsReady) {
        const values = reduceFieldsToValues(fields, true);
        const shouldSendSchema = !prevWindowType.current || prevWindowType.current !== previewWindowType;
        prevWindowType.current = previewWindowType;
        const message = {
          type: "payload-live-preview",
          data: values,
          externallyUpdatedRelationship: mostRecentUpdate,
          fieldSchemaJSON: shouldSendSchema ? fieldSchemaJSON : undefined,
          locale: locale.code
        };
        if (previewWindowType === "popup" && popupRef.current) {
          popupRef.current.postMessage(message, url);
        }
        if (previewWindowType === "iframe" && iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(message, url);
        }
      }
    };
    $[0] = appIsReady;
    $[1] = fieldSchemaJSON;
    $[2] = fields;
    $[3] = iframeRef;
    $[4] = locale;
    $[5] = mostRecentUpdate;
    $[6] = popupRef;
    $[7] = previewWindowType;
    $[8] = url;
    $[9] = t0;
  } else {
    t0 = $[9];
  }
  let t1;
  if ($[10] !== appIsReady || $[11] !== fieldSchemaJSON || $[12] !== fields || $[13] !== iframeHasLoaded || $[14] !== iframeRef || $[15] !== locale || $[16] !== mostRecentUpdate || $[17] !== popupRef || $[18] !== previewWindowType || $[19] !== setIframeHasLoaded || $[20] !== url) {
    t1 = [fields, url, iframeHasLoaded, previewWindowType, popupRef, appIsReady, iframeRef, setIframeHasLoaded, fieldSchemaJSON, mostRecentUpdate, locale];
    $[10] = appIsReady;
    $[11] = fieldSchemaJSON;
    $[12] = fields;
    $[13] = iframeHasLoaded;
    $[14] = iframeRef;
    $[15] = locale;
    $[16] = mostRecentUpdate;
    $[17] = popupRef;
    $[18] = previewWindowType;
    $[19] = setIframeHasLoaded;
    $[20] = url;
    $[21] = t1;
  } else {
    t1 = $[21];
  }
  useEffect(t0, t1);
  let t2;
  if ($[22] !== iframeRef || $[23] !== popupRef || $[24] !== previewWindowType || $[25] !== url) {
    t2 = () => {
      const message_0 = {
        type: "payload-document-event"
      };
      if (previewWindowType === "popup" && popupRef.current) {
        popupRef.current.postMessage(message_0, url);
      }
      if (previewWindowType === "iframe" && iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(message_0, url);
      }
    };
    $[22] = iframeRef;
    $[23] = popupRef;
    $[24] = previewWindowType;
    $[25] = url;
    $[26] = t2;
  } else {
    t2 = $[26];
  }
  let t3;
  if ($[27] !== iframeRef || $[28] !== mostRecentUpdate || $[29] !== popupRef || $[30] !== previewWindowType || $[31] !== url) {
    t3 = [mostRecentUpdate, iframeRef, popupRef, previewWindowType, url];
    $[27] = iframeRef;
    $[28] = mostRecentUpdate;
    $[29] = popupRef;
    $[30] = previewWindowType;
    $[31] = url;
    $[32] = t3;
  } else {
    t3 = $[32];
  }
  useEffect(t2, t3);
  if (previewWindowType === "iframe") {
    const t4 = breakpoint && breakpoint !== "responsive" && `${baseClass}--has-breakpoint`;
    let t5;
    if ($[33] !== t4) {
      t5 = [baseClass, t4].filter(Boolean);
      $[33] = t4;
      $[34] = t5;
    } else {
      t5 = $[34];
    }
    const t6 = t5.join(" ");
    let t7;
    if ($[35] !== iframeRef || $[36] !== props || $[37] !== setIframeHasLoaded || $[38] !== t6 || $[39] !== url) {
      t7 = _jsx("div", {
        className: t6,
        children: _jsxs("div", {
          className: `${baseClass}__wrapper`,
          children: [_jsx(LivePreviewToolbar, {
            ...props
          }), _jsx("div", {
            className: `${baseClass}__main`,
            children: _jsx(DeviceContainer, {
              children: url ? _jsx(IFrame, {
                ref: iframeRef,
                setIframeHasLoaded,
                url
              }) : _jsx(ShimmerEffect, {
                height: "100%"
              })
            })
          })]
        })
      });
      $[35] = iframeRef;
      $[36] = props;
      $[37] = setIframeHasLoaded;
      $[38] = t6;
      $[39] = url;
      $[40] = t7;
    } else {
      t7 = $[40];
    }
    return t7;
  }
};
//# sourceMappingURL=index.js.map