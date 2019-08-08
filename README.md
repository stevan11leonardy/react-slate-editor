<h1 align="center">React Slate Editor</h1>

<div align="center">

A rich text editor based on [SlateJS](https://github.com/ianstormtaylor/slate) framework

[![version](https://img.shields.io/github/package-json/v/stevan11leonardy/react-slate-editor?color=green)](https://www.npmjs.com/package/react-slate-editor)
[![npm downloads](https://img.shields.io/npm/dt/react-slate-editor?color=green)](https://www.npmjs.com/package/react-slate-editor)
[![Licence](https://img.shields.io/npm/l/react-slate-editor?color=green&label=license)](https://github.com/stevan11leonardy/react-slate-editor/blob/master/LICENSE)

</div>

## Installation
The slate-editor is available as an [npm package](https://www.npmjs.com/package/react-slate-editor).

## Usage

**Basic example**
```jsx
import React from 'react'
import Editor from 'react-slate-editor'

const toolbar = ['bold', 'italic', 'underline', 'code', 'fontSize', 'sizeUp', 'sizeDown', 'link', 'image', 'orderedList', 'unorderedList', 'alignment']

function App() {

  function onEditorChange(value) { // function for set your state or post to your api
    postToApi(value) // html file ready to be saved to server
  }

  return (
    <Editor
      initialValue={'<p></p>'}
      onEditorChange={onEditorChange}
      toolbar={toolbar} //customize your toolbar
      uploadServerLink={'https://whereyouuploadit.com'} // add your upload api link here
      accessToken={'add your server token'} // give me some access please
    />
  );
}
export default App;
```
## References
- [SlateJS](https://github.com/ianstormtaylor/slate) - A completely customizable framework for building rich text editors.
