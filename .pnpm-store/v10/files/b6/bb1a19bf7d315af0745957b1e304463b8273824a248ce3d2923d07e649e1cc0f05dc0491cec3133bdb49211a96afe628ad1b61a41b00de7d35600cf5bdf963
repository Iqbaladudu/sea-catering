import type { SerializedEditorState } from 'lexical';
import type { Block } from 'payload';
import type { NodeWithHooks } from '../../typesServer.js';
import { type MultilineElementTransformer, type TextMatchTransformer, type Transformer } from '../../../packages/@lexical/markdown/index.js';
export declare function createTagRegexes(tagName: string): {
    regExpEnd: RegExp;
    regExpStart: RegExp;
};
export declare const getBlockMarkdownTransformers: ({ blocks, inlineBlocks, }: {
    blocks: Block[];
    inlineBlocks: Block[];
}) => ((props: {
    allNodes: Array<NodeWithHooks>;
    allTransformers: Transformer[];
}) => MultilineElementTransformer | TextMatchTransformer)[];
export declare function getMarkdownToLexical(allNodes: Array<NodeWithHooks>, allTransformers: Transformer[]): (args: {
    markdown: string;
}) => SerializedEditorState;
export declare function getLexicalToMarkdown(allNodes: Array<NodeWithHooks>, allTransformers: Transformer[]): (args: {
    editorState: Record<string, any>;
}) => string;
//# sourceMappingURL=markdownTransformer.d.ts.map