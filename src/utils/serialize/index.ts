import escapeHtml from 'escape-html'
import { Text } from 'slate';

const serialize = node => {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children = node.children.map(n => serialize(n)).join('')

  console.log(node.type)
  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    // case 'bold':
    //   return `<strong>${children}</strong>`;
    // case 'italic':
    //   return `<em>${children}</em>`;
    // case 'underline':
    //   return `<span style="text-decoration:underline">${children}</span>`;
    default:
      return children
  }
}

export { serialize };