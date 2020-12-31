import React from 'react';
import { RenderElementProps } from 'slate-react';

const BoldElement: React.FC<RenderElementProps> = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return <strong {...attributes}>{children}</strong>
}

export default BoldElement;
