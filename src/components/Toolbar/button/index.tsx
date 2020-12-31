import React from 'react';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';

interface ToolbarButton extends ButtonBaseProps {
  active?: boolean;
}

const ToolbarButton: React.FC<ToolbarButton> = (props: ToolbarButton) => {
  const { active = false, ...rest } = props;
  return (
    <ButtonBase
      className={(active) ? 'toggle active' : 'toggle'}
      {...rest}
    >
      {props.children}
    </ButtonBase>
  )
}

export default ToolbarButton;
