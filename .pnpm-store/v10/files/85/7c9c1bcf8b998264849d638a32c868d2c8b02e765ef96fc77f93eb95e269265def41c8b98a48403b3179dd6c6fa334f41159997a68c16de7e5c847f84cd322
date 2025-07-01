'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth, useConfig, useEntityVisibility } from '@payloadcms/ui';
import * as React from 'react';
const filterRichTextCollections = (collections, options) => {
  return collections.filter(({
    slug,
    admin: {
      enableRichTextRelationship
    },
    upload
  }) => {
    if (!options?.visibleEntities?.collections.includes(slug)) {
      return false;
    }
    if (options?.uploads) {
      return enableRichTextRelationship && Boolean(upload) === true;
    }
    return upload ? false : enableRichTextRelationship;
  });
};
export const EnabledRelationshipsCondition = props => {
  const $ = _c(20);
  let FallbackComponent;
  let children;
  let rest;
  let t0;
  if ($[0] !== props) {
    ({
      children,
      FallbackComponent,
      uploads: t0,
      ...rest
    } = props);
    $[0] = props;
    $[1] = FallbackComponent;
    $[2] = children;
    $[3] = rest;
    $[4] = t0;
  } else {
    FallbackComponent = $[1];
    children = $[2];
    rest = $[3];
    t0 = $[4];
  }
  const uploads = t0 === undefined ? false : t0;
  const {
    config: t1
  } = useConfig();
  const {
    collections
  } = t1;
  const {
    user
  } = useAuth();
  const {
    visibleEntities
  } = useEntityVisibility();
  let t2;
  if ($[5] !== collections || $[6] !== uploads || $[7] !== user || $[8] !== visibleEntities) {
    t2 = () => filterRichTextCollections(collections, {
      uploads,
      user,
      visibleEntities
    }).map(_temp);
    $[5] = collections;
    $[6] = uploads;
    $[7] = user;
    $[8] = visibleEntities;
    $[9] = t2;
  } else {
    t2 = $[9];
  }
  const [enabledCollectionSlugs] = React.useState(t2);
  if (!enabledCollectionSlugs.length) {
    let t3;
    if ($[10] !== FallbackComponent || $[11] !== rest) {
      t3 = FallbackComponent ? _jsx(FallbackComponent, {
        ...rest
      }) : null;
      $[10] = FallbackComponent;
      $[11] = rest;
      $[12] = t3;
    } else {
      t3 = $[12];
    }
    return t3;
  }
  let t3;
  if ($[13] !== children || $[14] !== enabledCollectionSlugs || $[15] !== rest) {
    let t4;
    if ($[17] !== enabledCollectionSlugs || $[18] !== rest) {
      t4 = {
        ...rest,
        enabledCollectionSlugs
      };
      $[17] = enabledCollectionSlugs;
      $[18] = rest;
      $[19] = t4;
    } else {
      t4 = $[19];
    }
    t3 = React.cloneElement(children, t4);
    $[13] = children;
    $[14] = enabledCollectionSlugs;
    $[15] = rest;
    $[16] = t3;
  } else {
    t3 = $[16];
  }
  return t3;
};
function _temp(t0) {
  const {
    slug
  } = t0;
  return slug;
}
//# sourceMappingURL=EnabledRelationshipsCondition.js.map