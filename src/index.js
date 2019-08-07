import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App
    uploadServerLink={'https://api.dextion.com/api/studio/upload_to_tmp'}
    accessToken={'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwdm9pQmZGcVBZSW03SUdpNnFCOHFWVjVnTHBtbUxHNCIsImV4cCI6MTU5NjcwMzExNywibmJmIjoxNTY1MTY3MTE3LCJpYXQiOjE1NjUxNjcxMTcsImlkIjoxLCJhZGRyZXNzIjoiYXNkZiBhc2RmIGFzZGYiLCJjaXR5IjoiYXNkZiIsImNyZWF0ZWRfYXQiOiIyMDE3LTA5LTEzIDAzOjQxOjU5IiwidXBkYXRlZF9hdCI6IjIwMTktMDgtMDcgMDQ6Mzg6MDEiLCJuYW1lIjoiR2VyeSBEaGFybWF3YW4iLCJlbWFpbCI6ImdlcnlkaGFybWF3YW5AZ21haWwuY29tIiwibG9jYXRpb25fY29kZSI6IklEIiwicGhvbmUiOiIwODExNjEzNTg1OCIsInN0YXR1cyI6MSwibmV0d29yayI6MSwiZ29vZ2xlX2lkIjoiMTA3Njg1MDQ5NDEyNjQxOTI4Mzc5IiwiYXZhdGFyIjpudWxsLCJkZXBvc2l0IjoiMC4wMCIsImlzX3RpY2tldGluZyI6MX0.Arj1N7_cFs1JdOdEpfdKDt00N0vQsIYMQnlIhAx_8Rs'}
    initialValue={{
      object: 'value',
      document: {
        object: 'document',
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                text:
                  'In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.',
              },
            ],
          },
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                text:
                  'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your keyboard and paste it anywhere in the editor!',
              },
            ],
          },
        ],
      },
    }}
    toolbar={['bold', 'italic']}
  />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
