import React from 'react';
import { RenderElementProps } from 'slate-react';
import BoldElement from './BoldElement';
import DefaultElement from './DefaultElement';

const RenderElement: React.FC<RenderElementProps> = (props: RenderElementProps) => {
  const { element } = props;
  switch (element?.type) {
    case 'strong':
      return <BoldElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
}

export default RenderElement;
