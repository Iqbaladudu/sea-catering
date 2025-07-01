import type { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import type { DOMConversionMap, LexicalNode, Spread } from 'lexical';
import type { JSX } from 'react';
import type { UploadData } from '../../server/nodes/UploadNode.js';
import { UploadServerNode } from '../../server/nodes/UploadNode.js';
export type SerializedUploadNode = {
    children?: never;
    type: 'upload';
} & Spread<UploadData, SerializedDecoratorBlockNode>;
export declare class UploadNode extends UploadServerNode {
    static clone(node: UploadServerNode): UploadServerNode;
    static getType(): string;
    static importDOM(): DOMConversionMap<HTMLImageElement>;
    static importJSON(serializedNode: SerializedUploadNode): UploadNode;
    decorate(): JSX.Element;
    exportJSON(): SerializedUploadNode;
}
export declare function $createUploadNode({ data, }: {
    data: Omit<UploadData, 'id'> & Partial<Pick<UploadData, 'id'>>;
}): UploadNode;
export declare function $isUploadNode(node: LexicalNode | null | undefined): node is UploadNode;
//# sourceMappingURL=UploadNode.d.ts.map