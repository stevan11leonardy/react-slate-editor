import React, { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import FormatColorIcon from '@material-ui/icons/FormatColorFill';
import ToolbarButton from './button';
import { useSlate, ReactEditor } from 'slate-react';
import { isBoldMarkActive, isItalicMarkActive, isUnderlineMarkActive } from '../../utils/formatting';
import { Editor, Text, Transforms } from 'slate';
import { Transform } from '@material-ui/icons';

const ToolbarButtons = [
  {
    type: 'toggle',
    title: 'bold',
    command: 'bold',
    icon: <BoldIcon fontSize="small" />,
    isActive: isBoldMarkActive,
  },
  {
    type: 'toggle',
    title: 'italic',
    command: 'italic',
    icon: <ItalicIcon fontSize="small" />,
    isActive: isItalicMarkActive,
  },
  {
    type: 'toggle',
    title: 'underline',
    command: 'underline',
    icon: <UnderlineIcon fontSize="small" />,
    isActive: isUnderlineMarkActive,
  },
  {
    type: 'seperator',
  },
  {
    type: 'toggle',
    title: 'font size',
    command: 'font-size',
    icon: <FormatSizeIcon fontSize="small" />,
    isActive: () => false,
  },
  {
    type: 'toggle',
    title: 'font color',
    command: 'font-color',
    icon: <FormatColorIcon fontSize="small" />,
    isActive: () => false,
  },
  {
    type: 'seperator',
  },
]

const Toolbar = () => {
  const [popover, setPopover] = useState({
    anchorEl: null,
    options: [],
  })

  const editor = useSlate();

  function handleToolbarButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const { dataset } = event.currentTarget;

    if (dataset?.command) {
      editor.addMark('type', dataset?.command);
      editor.addMark(dataset?.command, true);

      ReactEditor.focus(editor);
    }
  }

  return (
    <div className='toolbar-container'>
      {
        ToolbarButtons.map((element, index) => {
          if (element.type === 'toggle') {
            return (
              <ToolbarButton
                key={index}
                onClick={handleToolbarButtonClick}
                data-command={element.command}
                title={element.title}
                active={element.isActive(editor)}
              >
                {element.icon}
              </ToolbarButton>
            )
          }
          return (
            <div className='separator' key={index}>
              <Divider orientation='vertical' />
            </div>
          )
        })
      }
    </div>
  )
}

export default Toolbar;
