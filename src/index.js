import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function Main() {
  const [initialState, setInitialState] = useState('<p></p>');

  function onEditorChange(value) {
    return value;
  }

  function onButtonClick() {
    setInitialState(!initialState);
  }

  return (
    <>
      <button type="button" onClick={onButtonClick}>Reset</button>
      <App
        initialValue={initialState}
        onEditorChange={onEditorChange}
        uploadServerLink={'Upload Link'}
        accessToken={'Your Access Token'}
        toolbar={['bold', 'italic', 'underline', 'code', 'fontSize', 'sizeUp', 'sizeDown', 'link', 'image', 'orderedList', 'unorderedList', 'alignment']}
        // reinitialize
      />
    </>
  );
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root'),
);
