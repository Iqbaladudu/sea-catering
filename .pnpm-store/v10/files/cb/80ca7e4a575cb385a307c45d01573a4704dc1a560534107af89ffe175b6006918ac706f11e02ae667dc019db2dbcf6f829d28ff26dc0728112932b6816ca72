'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import ObjectID from 'bson-objectid';
import { $applyNodeReplacement } from 'lexical';
import * as React from 'react';
import { isGoogleDocCheckboxImg, UploadServerNode } from '../../server/nodes/UploadNode.js';
const RawUploadComponent = /*#__PURE__*/React.lazy(() => import('../../client/component/index.js').then(module => ({
  default: module.UploadComponent
})));
function $convertUploadElement(domNode) {
  if (domNode.hasAttribute('data-lexical-upload-relation-to') && domNode.hasAttribute('data-lexical-upload-id')) {
    const id = domNode.getAttribute('data-lexical-upload-id');
    const relationTo = domNode.getAttribute('data-lexical-upload-relation-to');
    if (id != null && relationTo != null) {
      const node = $createUploadNode({
        data: {
          fields: {},
          relationTo,
          value: id
        }
      });
      return {
        node
      };
    }
  }
  const img = domNode;
  if (img.src.startsWith('file:///') || isGoogleDocCheckboxImg(img)) {
    return null;
  }
  // TODO: Auto-upload functionality here!
  //}
  return null;
}
export class UploadNode extends UploadServerNode {
  static clone(node) {
    return super.clone(node);
  }
  static getType() {
    return super.getType();
  }
  static importDOM() {
    return {
      img: node => ({
        conversion: $convertUploadElement,
        priority: 0
      })
    };
  }
  static importJSON(serializedNode) {
    if (serializedNode.version === 1 && serializedNode?.value?.id) {
      serializedNode.value = serializedNode.value.id;
    }
    if (serializedNode.version === 2 && !serializedNode?.id) {
      serializedNode.id = new ObjectID.default().toHexString();
      serializedNode.version = 3;
    }
    const importedData = {
      id: serializedNode.id,
      fields: serializedNode.fields,
      relationTo: serializedNode.relationTo,
      value: serializedNode.value
    };
    const node = $createUploadNode({
      data: importedData
    });
    node.setFormat(serializedNode.format);
    return node;
  }
  decorate() {
    return /*#__PURE__*/_jsx(RawUploadComponent, {
      data: this.__data,
      nodeKey: this.getKey()
    });
  }
  exportJSON() {
    return super.exportJSON();
  }
}
export function $createUploadNode({
  data
}) {
  if (!data?.id) {
    data.id = new ObjectID.default().toHexString();
  }
  return $applyNodeReplacement(new UploadNode({
    data: data
  }));
}
export function $isUploadNode(node) {
  return node instanceof UploadNode;
}
//# sourceMappingURL=UploadNode.js.map