import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const highlightedCode = Prism.highlight(code, Prism.languages.markup, 'markup');

  return (
    <pre className={`language-${language}`}>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

export default CodeBlock;
