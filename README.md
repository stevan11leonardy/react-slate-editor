<h1 align="center">React Slate Editor</h1>

<div align="center">

A rich text editor based on [SlateJS](https://github.com/ianstormtaylor/slate) framework

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
  return (
    <Editor
      toolbar={toolbar} //customize your toolbar
      uploadServerLink={'https://whereyouuploadit.com'} // add your upload api link here
      accessToken={'add your server token'} // give me some access please
      initialValue={{'something'}} // add your initialvalue here, object is required
    />
  );
}
export default App;
```
## References
- [SlateJS](https://github.com/ianstormtaylor/slate) - A completely customizable framework for building rich text editors.
