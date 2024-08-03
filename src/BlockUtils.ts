import { Editor, Transforms, Element as SlateElement } from 'slate'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useSlate } from 'slate-react'
import { useCallback } from 'react'
export const getProp = (n: any, prop: string) => n[prop]
export const setProps = (editor: any, prop: string, value: string | number) =>
  Transforms.setNodes<SlateElement>(editor, { [prop]: value } as any)
export const setPropsOrRemove = (editor: any, prop: string, value: string | number) =>
  Transforms.setNodes<SlateElement>(editor, { [prop]: isBlockProps(editor, prop, value) ? 'paragraph' : value } as any)
export const getMatch = (a: any, b: any) => {
  const c: any = Editor.nodes(a, b)
  return c
}
export const getTabs = (editor: any) => {
  for (let i = 0; i < 10; i++) if (isBlockProps(editor, 'tabs', i)) return i
  return 0
}
export const setTabs = (editor: any, i: number) => setProps(editor, 'tabs', i < 0 ? 0 : i > 9 ? 9 : i)
export const isBlockProps = (editor: any, prop: string, value: string | number) => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(getMatch(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n: any) => !Editor.isEditor(n) && SlateElement.isElement(n) && getProp(n, prop) === value,
  })) as Array<Array<any> | undefined>;
  return match && (match.length > 0)
}
export const getBlockProps = (editor: any, prop: string) => {
  const { selection } = editor
  if (!selection) return false
  const a = Array.from(getMatch(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n: any) => !Editor.isEditor(n) && SlateElement.isElement(n) && getProp(n, prop),
  })) as Array<Array<any> | undefined>
  if (a === undefined || a.length === 0 || a[0] === undefined || a[0].length === 0) return '';
  return a[0][0][prop];
}
export const useBlockProps = (props: string) => {
  const editor = useSlate()
  const v = getBlockProps(editor, props);
  const c = useCallback((s: any) => setProps(editor, props, s), [])
  return [c, v];
}