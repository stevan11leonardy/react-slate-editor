import React from 'react';
import { RenderElementProps } from 'slate-react';

const DefaultElement: React.FC<RenderElementProps> = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

export default DefaultElement;
