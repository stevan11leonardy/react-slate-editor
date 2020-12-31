import React from 'react';
import ReactEditor from '../index';

export default {
  title: "Editor"
};

export const Editor = () => {
  return (
    <div>
      <ReactEditor
        value={'<p>Write something here</p>'}
      />
    </div>
  )
}