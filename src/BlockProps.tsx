import { ButtonGroup } from 'react-bootstrap'
import { useSlate } from 'slate-react'
import { Editor, Transforms, Element as SlateElement } from 'slate'
import { ButtonConfig } from '@victorequena22/component-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useCallback } from 'react'
interface IProps {
  left?: number
}
const getProp = (n: any, prop: string) => n[prop]
const setProps = (editor: any, prop: string, value: string | number) =>
  Transforms.setNodes<SlateElement>(editor, { [prop]: value } as any)
const setPropsOrRemove = (editor: any, prop: string, value: string | number) =>
  Transforms.setNodes<SlateElement>(editor, { [prop]: isBlockProps(editor, prop, value) ? 'paragraph' : value } as any)
const getMatch = (a: any, b: any) => {
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
  })) as Array<Array<any> | undefined>
  if (match) console.log(match, match)
  return match && (match.length > 0)
}
//block menus
export const TabsMenu = ({ left = 2 }: IProps) => {
  const editor = useSlate()
  const tabs = getTabs(editor)
  return (
    <ButtonGroup className={`ml-${left}`}>
      <ButtonConfig tip='TABULAR TEXTO A LA IZQUIERDA' icon='fas fa-angle-left' action={() => setTabs(editor, tabs - 1)} />
      <ButtonConfig tip='TABULAR TEXTO A LA DERECHA' icon='fas fa-angle-right' action={() => setTabs(editor, tabs + 1)} />
    </ButtonGroup>
  )
}
export const AlingMenu = ({ left = 2 }: IProps) => {
  const editor = useSlate()
  const val = useCallback((e: string) => isBlockProps(editor, 'align', e), [editor]);
  const set = useCallback((e: string) => setProps(editor, 'align', e), [editor]);
  return (
    <ButtonGroup className={`ml-${left}`}>
      <ButtonConfig tip='ALINEAR TEXTO A LA IZQUIERDA' icon='fas fa-align-left'
        active={val('left')} action={() => set('left')} />
      <ButtonConfig tip='CENTRAR TEXTO' icon='fas fa-align-center'
        active={val('center')} action={() => set('center')} />
      <ButtonConfig tip='ALINEAR TEXTO A LA DERECHA' icon='fas fa-align-right'
        active={val('right')} action={() => set('right')} />
      <ButtonConfig tip='JUSTIFICAR TEXTO' icon='fas fa-align-justify'
        active={val('justify')} action={() => set('justify')} />
    </ButtonGroup>
  )
}
export const TypeMenu = ({ left = 2 }: IProps) => {
  const editor = useSlate()
  const val = useCallback((e: string) => isBlockProps(editor, 'type', e), [editor]);
  const set = useCallback((e: string) => setPropsOrRemove(editor, 'type', e), [editor]);
  return (
    <ButtonGroup className={`ml-${left}`}>
      <ButtonConfig tip='TITULO 1' icon='fas fa-heading'
        active={val('heading-one')} action={() => set('heading-one')} />
      <ButtonConfig tip='TITULO 2' icon='fas fa-h1'
        active={val('heading-two')} action={() => set('heading-two')} />
      <ButtonConfig tip='TITULO 3' icon='fas fa-h2'
        active={val('heading-tre')} action={() => set('heading-tre')} />
      <ButtonConfig tip='TITULO 4' icon='fas fa-h3'
        active={val('heading-for')} action={() => set('heading-for')} />
    </ButtonGroup>
  )
}
export const ListMenu = ({ left = 2 }: IProps) => {
  const editor = useSlate()
  const val = useCallback((e: string) => isBlockProps(editor, 'list', e), [editor]);
  const set = useCallback((e: string) => setPropsOrRemove(editor, 'list', e), [editor]);
  return (
    <ButtonGroup className={`ml-${left}`}>
      <ButtonConfig tip='LISTA CON PUNTOS' icon='fas fa-list-ul'
        active={val('bulleted-list')} action={() => set('bulleted-list')} />
      <ButtonConfig tip='LISTA CON CUADROS' icon='fas fa-list'
        active={val('list-item')} action={() => set('list-item')} />
    </ButtonGroup>
  )
}
