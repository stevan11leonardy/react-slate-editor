import { serialize } from './serialize';
import { deserialize } from './deserialize';

const parseHTMLString = (html: string): HTMLElement => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body;
}

export { serialize, deserialize, parseHTMLString };