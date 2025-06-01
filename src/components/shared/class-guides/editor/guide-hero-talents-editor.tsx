'use client';

import { useState } from 'react';
import { MDTabContentEditor } from './components/md-tab-content-editor';

export const GuideHeroTalentsEditor = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  return (
    <div>
      <MDTabContentEditor
        content={markdownContent}
        onContentChange={setMarkdownContent}
      />
    </div>
  );
};
