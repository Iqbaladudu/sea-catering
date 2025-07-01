import type { Klass, LexicalNode, LexicalNodeReplacement, SerializedEditorState } from 'lexical';
import type { ClientBlock } from 'payload';
import type { Transformer } from '../../../packages/@lexical/markdown/index.js';
import type { MultilineElementTransformer } from '../../../packages/@lexical/markdown/MarkdownTransformers.js';
export declare const getBlockMarkdownTransformers: ({ blocks, }: {
    blocks: ClientBlock[];
}) => ((props: {
    allNodes: Array<Klass<LexicalNode> | LexicalNodeReplacement>;
    allTransformers: Transformer[];
}) => MultilineElementTransformer)[];
export declare function getMarkdownToLexical(allNodes: Array<Klass<LexicalNode> | LexicalNodeReplacement>, allTransformers: Transformer[]): (args: {
    markdown: string;
}) => SerializedEditorState;
export declare function getLexicalToMarkdown(allNodes: Array<Klass<LexicalNode> | LexicalNodeReplacement>, allTransformers: Transformer[]): (args: {
    editorState: Record<string, any>;
}) => string;
//# sourceMappingURL=markdownTransformer.d.ts.map