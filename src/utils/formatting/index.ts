import { Editor } from "slate";

function isBoldMarkActive(editor): boolean {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === 'bold',
    universal: true,
  })

  return !!match
}

function isItalicMarkActive(editor): boolean {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === 'italic',
    universal: true,
  })

  return !!match
}

function isUnderlineMarkActive(editor): boolean {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === 'underline',
    universal: true,
  })

  return !!match
}

export { isBoldMarkActive, isItalicMarkActive, isUnderlineMarkActive };