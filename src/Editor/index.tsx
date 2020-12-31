import React, { useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react'
import RenderElement from '../components/RenderElement';
import { deserialize, parseHTMLString, serialize } from '../utils';
import { EditorProps } from './editor.types';
import '../styles/index.scss';
import Toolbar from '../components/Toolbar';
import { ThemeProvider } from '@material-ui/core';
import theme from '../styles/theme';
import RenderLeaf from '../components/RenderLeaf';

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const {
    value: initialValue = '<p></p>',
    onChange,
    placeholder = 'Type something...',
  } = props;

  const [
    value, setValue
  ] = useState<Node[]>(deserialize(parseHTMLString(initialValue)))

  
  function handleEditorChange(newValue: Node[]): void {
    setValue(newValue);
    
    console.log(newValue);
    // console.log(serialize({ children: newValue }));

    //check if onChange exist passing from props
    if (onChange) {
      onChange(serialize({ children: newValue }));
    }
  }

  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <ThemeProvider
      theme={theme}
    >
      <div className="rse-container">
        <Slate
          editor={editor}
          value={value}
          onChange={handleEditorChange}
        >
          <Toolbar />
          <Editable
            placeholder={placeholder}
            renderElement={RenderElement}
            renderLeaf={RenderLeaf}
            className="editor-container"
          />
        </Slate>
      </div>
    </ThemeProvider>
  )
}

export default Editor;
