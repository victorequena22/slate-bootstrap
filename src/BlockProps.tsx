import { ButtonGroup } from 'react-bootstrap'
import { useSlate } from 'slate-react'
import { ButtonConfig } from '@victorequena22/component-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useCallback } from 'react'
import { getTabs, isBlockProps, setProps, setPropsOrRemove, setTabs } from './BlockUtils'
interface IProps {
  left?: number
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
