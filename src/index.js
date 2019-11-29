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
        uploadServerLink={'https://api.dextion.com/api/studio/upload_to_tmp'}
        accessToken={'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwdm9pQmZGcVBZSW03SUdpNnFCOHFWVjVnTHBtbUxHNCIsImV4cCI6MTU5NjcwMzExNywibmJmIjoxNTY1MTY3MTE3LCJpYXQiOjE1NjUxNjcxMTcsImlkIjoxLCJhZGRyZXNzIjoiYXNkZiBhc2RmIGFzZGYiLCJjaXR5IjoiYXNkZiIsImNyZWF0ZWRfYXQiOiIyMDE3LTA5LTEzIDAzOjQxOjU5IiwidXBkYXRlZF9hdCI6IjIwMTktMDgtMDcgMDQ6Mzg6MDEiLCJuYW1lIjoiR2VyeSBEaGFybWF3YW4iLCJlbWFpbCI6ImdlcnlkaGFybWF3YW5AZ21haWwuY29tIiwibG9jYXRpb25fY29kZSI6IklEIiwicGhvbmUiOiIwODExNjEzNTg1OCIsInN0YXR1cyI6MSwibmV0d29yayI6MSwiZ29vZ2xlX2lkIjoiMTA3Njg1MDQ5NDEyNjQxOTI4Mzc5IiwiYXZhdGFyIjpudWxsLCJkZXBvc2l0IjoiMC4wMCIsImlzX3RpY2tldGluZyI6MX0.Arj1N7_cFs1JdOdEpfdKDt00N0vQsIYMQnlIhAx_8Rs'}
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