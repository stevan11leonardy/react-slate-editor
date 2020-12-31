import React from 'react';
import { RenderLeafProps } from 'slate-react';

const RenderLeaf: React.FC<RenderLeafProps> = (props: RenderLeafProps) => {
  const { attributes, leaf, children } = props;
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? 'bold' : 'normal',
        fontStyle: leaf.italic ? 'italic' : 'normal',
        textDecoration: leaf.underline ? 'underline' : 'none',
      }}
    >
      {children}
    </span>
  )
}

export default RenderLeaf;
