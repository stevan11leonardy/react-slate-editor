import React from 'react';
import MuiPopover, { PopoverProps } from '@material-ui/core/Popover';

const Popover: React.FC<PopoverProps> = (props: PopoverProps) => {
  return (
    <MuiPopover
      {...props}
    >
      <div className="popover-content-container">
        {props.children}
      </div>
    </MuiPopover>
  )
}

export default Popover;
