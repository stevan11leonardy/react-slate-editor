import React from 'react';
import PropTypes from 'prop-types';

const EditorToolbar = (props) => {
  const { children } = props;
  return (
    <div className='editor-toolbar-container'>
      <div className='editor-toolbar'>
        {children}
      </div>
    </div>
  );
};

EditorToolbar.propTypes = {
  children: PropTypes.object,
};

export default EditorToolbar;
