'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { ShimmerEffect, useConfig } from '@payloadcms/ui';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { defaultEditorLexicalConfig } from '../lexical/config/client/default.js';
import { loadClientFeatures } from '../lexical/config/client/loader.js';
import { sanitizeClientEditorConfig } from '../lexical/config/client/sanitize.js';
const RichTextEditor = /*#__PURE__*/lazy(() => import('./Field.js').then(module => ({
  default: module.RichText
})));
export const RichTextField = props => {
  const $ = _c(16);
  const {
    admin: t0,
    clientFeatures,
    featureClientImportMap,
    featureClientSchemaMap,
    field,
    lexicalEditorConfig: t1,
    schemaPath
  } = props;
  let t2;
  if ($[0] !== t0) {
    t2 = t0 === undefined ? {} : t0;
    $[0] = t0;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const admin = t2;
  const lexicalEditorConfig = t1 === undefined ? defaultEditorLexicalConfig : t1;
  const {
    config
  } = useConfig();
  const [finalSanitizedEditorConfig, setFinalSanitizedEditorConfig] = useState(null);
  let t3;
  let t4;
  if ($[2] !== admin || $[3] !== clientFeatures || $[4] !== config || $[5] !== featureClientImportMap || $[6] !== featureClientSchemaMap || $[7] !== field || $[8] !== finalSanitizedEditorConfig || $[9] !== lexicalEditorConfig || $[10] !== schemaPath) {
    t3 = () => {
      if (finalSanitizedEditorConfig) {
        return;
      }
      const featureProvidersLocal = [];
      for (const [_featureKey, clientFeature] of Object.entries(clientFeatures)) {
        if (!clientFeature.clientFeatureProvider) {
          continue;
        }
        featureProvidersLocal.push(clientFeature.clientFeatureProvider(clientFeature.clientFeatureProps));
      }
      const finalLexicalEditorConfig = lexicalEditorConfig ? lexicalEditorConfig : defaultEditorLexicalConfig;
      const resolvedClientFeatures = loadClientFeatures({
        config,
        featureClientImportMap,
        featureClientSchemaMap,
        field,
        schemaPath: schemaPath ?? field.name,
        unSanitizedEditorConfig: {
          features: featureProvidersLocal,
          lexical: finalLexicalEditorConfig
        }
      });
      setFinalSanitizedEditorConfig(sanitizeClientEditorConfig(resolvedClientFeatures, finalLexicalEditorConfig, admin));
    };
    t4 = [lexicalEditorConfig, admin, finalSanitizedEditorConfig, clientFeatures, featureClientImportMap, featureClientSchemaMap, field, config, schemaPath];
    $[2] = admin;
    $[3] = clientFeatures;
    $[4] = config;
    $[5] = featureClientImportMap;
    $[6] = featureClientSchemaMap;
    $[7] = field;
    $[8] = finalSanitizedEditorConfig;
    $[9] = lexicalEditorConfig;
    $[10] = schemaPath;
    $[11] = t3;
    $[12] = t4;
  } else {
    t3 = $[11];
    t4 = $[12];
  }
  useEffect(t3, t4);
  let t5;
  if ($[13] !== finalSanitizedEditorConfig || $[14] !== props) {
    t5 = _jsx(Suspense, {
      fallback: _jsx(ShimmerEffect, {
        height: "35vh"
      }),
      children: finalSanitizedEditorConfig && _jsx(RichTextEditor, {
        ...props,
        editorConfig: finalSanitizedEditorConfig
      })
    });
    $[13] = finalSanitizedEditorConfig;
    $[14] = props;
    $[15] = t5;
  } else {
    t5 = $[15];
  }
  return t5;
};
//# sourceMappingURL=index.js.map