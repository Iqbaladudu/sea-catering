import { createHeadlessEditor } from '@lexical/headless';
import { $convertFromMarkdownString, $convertToMarkdownString } from '../../../packages/@lexical/markdown/index.js';
import { extractPropsFromJSXPropsString } from '../../../utilities/jsx/extractPropsFromJSXPropsString.js';
import { propsToJSXString } from '../../../utilities/jsx/jsx.js';
import { $createBlockNode, $isBlockNode, BlockNode } from './nodes/BlocksNode.js';
function createTagRegexes(tagName) {
  const escapedTagName = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return {
    regExpEnd: new RegExp(`</(${escapedTagName})\\s*>|<${escapedTagName}[^>]*?/>`, 'i'),
    regExpStart: new RegExp(`<(${escapedTagName})([^>]*?)\\s*(/?)>`, 'i')
  };
}
export const getBlockMarkdownTransformers = ({
  blocks
}) => {
  if (!blocks?.length) {
    return [];
  }
  const transformers = [];
  for (const block of blocks) {
    if (!block.jsx) {
      continue;
    }
    const regex = createTagRegexes(block.slug);
    transformers.push(({
      allNodes,
      allTransformers
    }) => ({
      type: 'multiline-element',
      dependencies: [BlockNode],
      export: node => {
        if (!$isBlockNode(node)) {
          return null;
        }
        if (node.getFields()?.blockType?.toLowerCase() !== block.slug.toLowerCase()) {
          return null;
        }
        const nodeFields = node.getFields();
        const lexicalToMarkdown = getLexicalToMarkdown(allNodes, allTransformers);
        const exportResult = block.jsx.export({
          fields: nodeFields,
          lexicalToMarkdown
        });
        if (exportResult === false) {
          return null;
        }
        if (typeof exportResult === 'string') {
          return exportResult;
        }
        if (exportResult?.children?.length) {
          return `<${nodeFields.blockType}${exportResult.props ? ' ' + propsToJSXString({
            props: exportResult.props
          }) : ''}>\n  ${exportResult.children}\n</${nodeFields.blockType}>`;
        }
        return `<${nodeFields.blockType}${exportResult.props ? ' ' + propsToJSXString({
          props: exportResult.props
        }) : ''}/>`;
      },
      regExpEnd: block.jsx?.customEndRegex ?? regex.regExpEnd,
      regExpStart: block.jsx?.customStartRegex ?? regex.regExpStart,
      replace: (rootNode, children, openMatch, closeMatch, linesInBetween) => {
        if (block?.jsx?.import) {
          if (!linesInBetween) {
            // convert children to linesInBetween
            let line = '';
            if (children) {
              for (const child of children) {
                line += child.getTextContent();
              }
            }
            linesInBetween = [line];
          }
          const childrenString = linesInBetween.join('\n').trim();
          const propsString = openMatch[2]?.trim();
          const markdownToLexical = getMarkdownToLexical(allNodes, allTransformers);
          const blockFields = block.jsx.import({
            children: childrenString,
            closeMatch: closeMatch,
            htmlToLexical: null,
            markdownToLexical,
            openMatch: openMatch,
            props: propsString ? extractPropsFromJSXPropsString({
              propsString
            }) : {}
          });
          if (blockFields === false) {
            return false;
          }
          const node = $createBlockNode({
            blockType: block.slug,
            ...blockFields,
            blockName: blockFields.blockName || ''
          });
          if (node) {
            rootNode.append(node);
          }
          return;
        }
        return false // Run next transformer
        ;
      }
    }));
  }
  return transformers;
};
export function getMarkdownToLexical(allNodes, allTransformers) {
  const markdownToLexical = ({
    markdown
  }) => {
    const headlessEditor = createHeadlessEditor({
      nodes: allNodes
    });
    headlessEditor.update(() => {
      $convertFromMarkdownString(markdown, allTransformers);
    }, {
      discrete: true
    });
    const editorJSON = headlessEditor.getEditorState().toJSON();
    return editorJSON;
  };
  return markdownToLexical;
}
export function getLexicalToMarkdown(allNodes, allTransformers) {
  const lexicalToMarkdown = ({
    editorState
  }) => {
    const headlessEditor = createHeadlessEditor({
      nodes: allNodes
    });
    try {
      headlessEditor.setEditorState(headlessEditor.parseEditorState(editorState)) // This should commit the editor state immediately
      ;
    } catch (e) {
      console.error('getLexicalToMarkdown: ERROR parsing editor state', e);
    }
    let markdown = '';
    headlessEditor.getEditorState().read(() => {
      markdown = $convertToMarkdownString(allTransformers);
    });
    return markdown;
  };
  return lexicalToMarkdown;
}
//# sourceMappingURL=markdownTransformer.js.map