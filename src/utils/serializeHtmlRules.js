/* eslint consistent-return: "off" */
import React from 'react';
import { transform } from './transformCSS';

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code',
};

const INLINE_TAGS = {
  span: 'span-select' || 'span-click',
  img: 'image',
  a: 'link',
};

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
  code: 'code',
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>;
          case 'quote':
            return <blockquote>{children}</blockquote>;
          default:
            return null;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underline':
            return <u>{children}</u>;
          case 'code':
            return <code>{children}</code>;
          default:
            return null;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const type = INLINE_TAGS[el.tagName.toLowerCase()];
      if (type) {
        const style = el.getAttribute('style');
        return {
          object: 'inline',
          type,
          data: {
            className: el.getAttribute('class'),
            style: (style !== undefined && style !== null) ? transform(style) : undefined,
            src: el.getAttribute('src'),
            href: el.getAttribute('href'),
          },
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'inline') {
        switch (obj.type) {
          case 'span-select':
            return <span style={obj.data.get('style')}>{children}</span>;
          case 'span-click':
            return <span style={obj.data.get('style')}>{children}</span>;
          case 'image':
            return <img src={obj.data.get('src')} alt='img'/>;
          case 'link':
            return <a href={obj.data.get('href')}>{children}</a>;
          default:
            return null;
        }
      }
    },
  },
];

export default rules;
