import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import { Value, Block } from 'slate';
import './App.css';
import Icon from 'react-icons-kit';
import { font_size_up } from 'react-icons-kit/ikons/font_size_up';
import { font_size_down } from 'react-icons-kit/ikons/font_size_down';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';
import { code as codeIcon } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { link } from 'react-icons-kit/feather/link';
import { alignCenter } from 'react-icons-kit/feather/alignCenter';
import { alignLeft } from 'react-icons-kit/feather/alignLeft';
import { alignRight } from 'react-icons-kit/feather/alignRight';
import { alignJustify } from 'react-icons-kit/feather/alignJustify';
import { image } from 'react-icons-kit/feather/image';
import { ic_format_list_numbered } from 'react-icons-kit/md/ic_format_list_numbered';
import List from '@convertkit/slate-lists';
import InsertImages from 'slate-drop-or-paste-images';
import { x } from 'react-icons-kit/feather/x';
import Toolbar from './Component/Toolbar';
import uploadImg from './utils/action';
import initialMockUpData from './utils/initialValue.json';

const plugins = [
  List({
    blocks: {
      ordered_list: 'ordered-list',
      unordered_list: 'unordered-list',
      list_item: 'list-item',
    },
  }),
  InsertImages({
    extensions: ['png', 'jpg', 'jpeg'],
    insertImage: (editor, file) => {
      const { uploadServerLink, accessToken } = editor.props;
      const formData = new FormData();
      formData.append('images', file);

      uploadImg({ uploadServerLink, accessToken }, formData)
        .then((resp) => {
          if (resp.status) {
            editor.insertInline({
              type: 'image',
              data: { src: resp.data.path },
            });
          }
        });
    },
  }),
];

function CodeNode(props) {
  return (
    <code>{props.children}</code>
  );
}

CodeNode.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node.isRequired,
};

function BoldMark(props) {
  return <strong>{props.children}</strong>;
}

BoldMark.propTypes = {
  children: PropTypes.object.isRequired,
};

function ItalicMark(props) {
  return <em property='italic'>{props.children}</em>;
}

ItalicMark.propTypes = {
  children: PropTypes.object.isRequired,
};

function UnderlineMark(props) {
  return <u>{props.children}</u>;
}

UnderlineMark.propTypes = {
  children: PropTypes.object.isRequired,
};

function LinkMark(props) {
  return <a href={props.link}>{props.text}</a>;
}

LinkMark.propTypes = {
  children: PropTypes.object.isRequired,
  link: PropTypes.string,
  text: PropTypes.string,
};

function addLink(editor, url) {
  editor.wrapInline({
    type: 'link',
    data: {
      href: url,
    },
  });
  editor.moveToEnd();
}

function removeLink(editor) {
  editor.unwrapInline('link');
}

function renderEditor(props, editor, next) {
  const { uploadServerLink, accessToken, toolbar } = props;
  const children = next();

  const { openLinkDialog, setOpenLinkDialog } = props;

  function hasUnderline() {
    return props.value.marks.some(mark => mark.type === 'underline');
  }

  function hasItalic() {
    return props.value.marks.some(mark => mark.type === 'italic');
  }

  function hasBold() {
    return props.value.marks.some(mark => mark.type === 'bold');
  }

  function hasCode() {
    return props.value.marks.some(mark => mark.type === 'code');
  }

  function hasLinks() {
    return props.value.inlines.some(inline => inline.type === 'link');
  }

  function hasImages() {
    return props.value.inlines.some(inline => inline.type === 'image');
  }

  function onMarkClick(event, type) {
    event.preventDefault();

    switch (type) {
      case 'ordered-list': {
        return editor.toggleList({ type: 'ordered-list' });
      }
      case 'unordered-list': {
        return editor.toggleList({ type: 'unordered-list' });
      }
      case 'link': {
        if (hasLinks()) {
          return removeLink(editor);
        }
        return setOpenLinkDialog(true);
      }
      default: {
        return editor.toggleMark(type);
      }
    }
  }

  function toggleAlignment(value) {
    editor.setBlocks({
      type: 'paragraph',
      data: {
        alignment: value,
      },
    });
  }

  function handleUploadImage(event) {
    event.preventDefault();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('images', file);

      uploadImg({ uploadServerLink, accessToken }, formData)
        .then((resp) => {
          if (resp.status) {
            editor.insertInline({
              type: 'image',
              data: { src: resp.data.path },
            });
          }
        });
    };
  }

  function onFontSizeSelect(event) {
    editor.wrapInline({
      type: 'span-select',
      data: {
        fontSize: event.target.value,
      },
    });
  }

  function onFontSizeClick(event) {
    let currentKey = null;
    editor.value.inlines.map((e) => { currentKey = e.key; return currentKey; });
    let fontSize = document.getElementById(`size-${currentKey}`);
    if (fontSize === null) {
      fontSize = 16 + Number(event.currentTarget.value);
      editor.wrapInline({
        type: 'span-click',
        data: {
          fontSize,
        },
      });
    } else {
      const currentFS = fontSize.style.getPropertyValue('font-size');
      fontSize = parseFloat(currentFS) + Number(event.currentTarget.value);
      editor.setInlines({
        type: 'span-click',
        data: {
          fontSize,
        },
      });
    }
  }

  function checkSelectedFontSize() {
    let selectedFontSize = 'normal';
    props.value.inlines.map((e) => { selectedFontSize = e.data.get('fontSize'); return selectedFontSize; });
    return selectedFontSize;
  }

  function handleSubmitDialogLink(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    addLink(editor, formData.get('url-link'));
  }

  function checkForAvailability(type) {
    if (toolbar === undefined) {
      return false;
    }
    return !toolbar.some(e => e === type);
  }

  return (
    <>
      <Toolbar>
        <>
          <button
            className={(hasBold()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={event => onMarkClick(event, 'bold')}
            title='Bold'
            hidden={checkForAvailability('bold')}
          >
            <Icon icon={bold}/>
          </button>
          <button
            className={(hasItalic()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={event => onMarkClick(event, 'italic')}
            title='Italic'
            hidden={checkForAvailability('italic')}
          >
            <Icon icon={italic}/>
          </button>
          <button
            className={(hasUnderline()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={event => onMarkClick(event, 'underline')}
            title='Underline'
            hidden={checkForAvailability('underline')}
          >
            <Icon icon={underline}/>
          </button>
          <button
            className={(hasCode()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={event => onMarkClick(event, 'code')}
            title='Code'
            hidden={checkForAvailability('code')}
          >
            <Icon icon={codeIcon}/>
          </button>
          <select
            onChange={onFontSizeSelect}
            value={checkSelectedFontSize()}
            hidden={checkForAvailability('fontSize')}
          >
            <option value='normal'>Normal</option>
            <option value='xx-small'>xx-Small</option>
            <option value='x-small'>x-Small</option>
            <option value='small'>Small</option>
            <option value='large'>Large</option>
            <option value='x-large'>x-Large</option>
            <option value='xx-large'>xx-Large</option>
          </select>
          <button
            className={(hasCode()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={event => onFontSizeClick(event)}
            title='Increase Font Size'
            value={2}
            hidden={checkForAvailability('sizeUp')}
          >
            <Icon icon={font_size_up}/>
          </button>
          <button
            className={(hasCode()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={event => onFontSizeClick(event)}
            title='Decrease Font Size'
            value={-2}
            hidden={checkForAvailability('sizeDown')}
          >
            <Icon icon={font_size_down}/>
          </button>
          <button
            className='editor-toolbar-button'
            onPointerDown={event => onMarkClick(event, 'unordered-list')}
            title='Unordered List'
            hidden={checkForAvailability('unorderedList')}
          >
            <Icon icon={list}/>
          </button>
          <button
            className='editor-toolbar-button'
            onPointerDown={event => onMarkClick(event, 'ordered-list')}
            title='Ordered List'
            hidden={checkForAvailability('orderedList')}
          >
            <Icon icon={ic_format_list_numbered}/>
          </button>
          <button
            className={(hasLinks()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={event => onMarkClick(event, 'link')}
            title='Link'
            hidden={checkForAvailability('link')}
          >
            <Icon icon={link}/>
          </button>
          <button
            className='editor-toolbar-button'
            onPointerDown={() => toggleAlignment('left')}
            title='Align Left'
            hidden={checkForAvailability('alignment')}
          >
            <Icon icon={alignLeft}/>
          </button>
          <button
            className='editor-toolbar-button'
            onPointerDown={() => toggleAlignment('center')}
            title='Align Center'
            hidden={checkForAvailability('alignment')}
          >
            <Icon icon={alignCenter}/>
          </button>
          <button
            className='editor-toolbar-button'
            onPointerDown={() => toggleAlignment('right')}
            title='Align Right'
            hidden={checkForAvailability('alignment')}
          >
            <Icon icon={alignRight}/>
          </button>
          <button
            className='editor-toolbar-button'
            onPointerDown={() => toggleAlignment('justify')}
            title='Align Justify'
            hidden={checkForAvailability('alignment')}
          >
            <Icon icon={alignJustify}/>
          </button>
          <button
            className={(hasImages()) ? 'editor-toolbar-button active-btn' : 'editor-toolbar-button'}
            onPointerDown={handleUploadImage}
            disabled={hasImages()}
            title='Add Image'
            hidden={checkForAvailability('image')}
          >
            <Icon icon={image}/>
          </button>
        </>
      </Toolbar>
      {openLinkDialog
      && <div className='input-link-dialog'>
          <div className='input-link-dialog-overlay'>&nbsp;</div>
          <form onSubmit={handleSubmitDialogLink} className='input-link-dialog-container' >
            <section className='input-link-dialog-header'>
              <p>Insert Your Link:</p>
              <button
                className='input-link-dialog-button'
                onPointerDown={() => setOpenLinkDialog(false)}
              >
                <Icon icon={x}/>
              </button>
            </section>
            <input
              type='url'
              name='url-link'
              className='input-link-dialog-input'
              placeholder='https://www.yourdomain.com'
              required
            />
            <input type='submit' value='Save'/>
          </form>
        </div>
      }
      {children}
    </>
  );
}

renderEditor.propTypes = {
  value: PropTypes.object,
  openLinkDialog: PropTypes.bool,
  setOpenLinkDialog: PropTypes.func,
  uploadServerLink: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  toolbar: PropTypes.array.isRequired,
};

const schema = {
  document: {
    normalize: (editor, {
      code, node, child, index,
    }) => {
      switch (code) {
        case 'child_type_invalid': {
          const type = index === 0 ? 'title' : 'paragraph';
          return editor.setNodeByKey(child.key, type);
        }
        case 'child_min_invalid': {
          const block = Block.create(index === 0 ? 'title' : 'paragraph');
          return editor.insertNodeByKey(node.key, index, block);
        }
        default:
          return null;
      }
    },
  },
  inlines: {
    image: {
      isVoid: true,
    },
  },
};


function App(props) {
  const {
    initialValue, onChange,
  } = props;
  const [openLinkDialog, setOpenLinkDialog] = useState(false);

  function onEditorKeyDown(event, editor, next) {
    if (event.ctrlKey) {
      switch (event.key) {
        case 'b': {
          event.preventDefault();
          editor.toggleMark('bold');
          break;
        }
        case 'i': {
          event.preventDefault();
          editor.toggleMark('italic');
          break;
        }
        case 'u': {
          event.preventDefault();
          editor.toggleMark('underline');
          break;
        }
        case '`': {
          const isCode = editor.value.blocks.some(block => block.type === 'code');
          event.preventDefault();
          editor.setBlocks(isCode ? 'paragraph' : 'code');
          break;
        }
        default: {
          return next();
        }
      }
    }
    return next();
  }

  function handleRenderBlock(prop, editor, next) {
    const {
      attributes, children, node,
    } = prop;
    switch (node.type) {
      case 'code':
        return <CodeNode {...prop} />;
      case 'paragraph': {
        const textAlign = node.data.get('alignment') || 'left';
        return (
          <div {...attributes} style={{ position: 'relative' }}>
            <p {...attributes} style={{ textAlign }}>
              {children}
            </p>
          </div>
        );
      }

      default:
        return next();
    }
  }

  function handleRenderInline(prop, editor, next) {
    const {
      attributes, children, node, isFocused,
    } = prop;
    editor.focus();
    switch (node.type) {
      case 'link': {
        setOpenLinkDialog(false);
        const { data } = node;
        const href = data.get('href');
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        );
      }
      case 'image': {
        const src = node.data.get('src');
        return (
          <img
            {...attributes}
            src={src}
            className='uploaded-image'
            alt='error'
            style={{
              border: (isFocused) ? '1px solid blue' : 'none',
            }}
          />
        );
      }
      case 'span-select': {
        const fontSize = node.data.get('fontSize');
        return (
          <span {...attributes} style={{ fontSize }}>
            {children}
          </span>
        );
      }
      case 'span-click': {
        const fontSize = Number(node.data.get('fontSize'));
        return (
          <span {...attributes} style={{ fontSize }} id={`size-${node.key}`}>
            {children}
          </span>
        );
      }
      default:
        return next();
    }
  }

  function handleRenderMark(prop, editor, next) {
    editor.focus();
    switch (prop.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
      case 'italic':
        return <ItalicMark {...props} />;
      case 'underline':
        return <UnderlineMark {...props} />;
      case 'code':
        return <CodeNode {...props} />;
      default:
        return next();
    }
  }

  return (
    <div className="editor-container">
      <Editor
        value={Value.fromJSON(initialValue || initialMockUpData)}
        onChange={onChange}
        onKeyDown={onEditorKeyDown}
        className='editor-content'
        renderBlock={handleRenderBlock}
        renderMark={handleRenderMark}
        renderEditor={renderEditor}
        plugins={plugins}
        renderInline={handleRenderInline}
        schema={schema}
        openLinkDialog={openLinkDialog}
        setOpenLinkDialog={setOpenLinkDialog}
        placeholder='Type here...'
        {...props}
      />
    </div>
  );
}

App.propTypes = {
  node: PropTypes.string,
  mark: PropTypes.string,
  attributes: PropTypes.object,
  children: PropTypes.object,
  isFocused: PropTypes.bool,
  initialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default App;
