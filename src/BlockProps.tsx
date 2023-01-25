import { ButtonGroup } from 'react-bootstrap'
import { useSlate } from 'slate-react'
import { Editor, Transforms, Element as SlateElement } from 'slate'
import { ButtonConfig } from '@victorequena22/component-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react'
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
      <ButtonConfig
        tip='TABULAR TEXTO A LA IZQUIERDA'
        icon='fas fa-angle-left'
        action={() => setTabs(editor, tabs - 1)}
      />
      <ButtonConfig
        tip='TABULAR TEXTO A LA DERECHA'
        icon='fas fa-angle-right'
        action={() => setTabs(editor, tabs + 1)}
      />
    </ButtonGroup>
  )
}
export const AlingMenu = ({ left = 2 }: IProps) => {
  const editor = useSlate()
  return (
    <ButtonGroup className={`ml-${left}`}>
      <ButtonConfig
        tip='ALINEAR TEXTO A LA IZQUIERDA'
        icon='fas fa-align-left'
        active={isBlockProps(editor, 'align', 'left')}
        action={() => setProps(editor, 'align', 'left')}
      />
      <ButtonConfig
        tip='CENTRAR TEXTO'
        icon='fas fa-align-center'
        active={isBlockProps(editor, 'align', 'center')}
        action={() => setProps(editor, 'align', 'center')}
      />
      <ButtonConfig
        tip='ALINEAR TEXTO A LA DERECHA'
        icon='fas fa-align-right'
        active={isBlockProps(editor, 'align', 'right')}
        action={() => setProps(editor, 'align', 'right')}
      />
      <ButtonConfig
        tip='JUSTIFICAR TEXTO'
        icon='fas fa-align-justify'
        active={isBlockProps(editor, 'align', 'justify')}
        action={() => setProps(editor, 'align', 'justify')}
      />
    </ButtonGroup>
  )
}
export const TypeMenu = ({ left = 2 }: IProps) => {
  const editor = useSlate()
  return (
    <ButtonGroup className={`ml-${left}`}>
      <ButtonConfig
        tip='TITULO 1'
        icon='fas fa-heading'
        active={isBlockProps(editor, 'type', 'heading-one')}
        action={() => setPropsOrRemove(editor, 'type', 'heading-one')}
      />
      <ButtonConfig
        tip='TITULO 2'
        icon='fas fa-h1'
        active={isBlockProps(editor, 'type', 'heading-two')}
        action={() => setPropsOrRemove(editor, 'type', 'heading-two')}
      />
      <ButtonConfig
        tip='TITULO 3'
        icon='fas fa-h2'
        active={isBlockProps(editor, 'type', 'heading-tre')}
        action={() => setPropsOrRemove(editor, 'type', 'heading-tre')}
      />
      <ButtonConfig
        tip='TITULO 4'
        icon='fas fa-h3'
        active={isBlockProps(editor, 'type', 'heading-for')}
        action={() => setPropsOrRemove(editor, 'type', 'heading-for')}
      />
    </ButtonGroup>
  )
}
export const ListMenu = ({ left = 2 }: IProps) => {
  const editor = useSlate()
  return (
    <ButtonGroup className={`ml-${left}`}>
      <ButtonConfig
        tip='LISTA CON PUNTOS'
        icon='fas fa-list-ul'
        active={isBlockProps(editor, 'list', 'bulleted-list')}
        action={() => setPropsOrRemove(editor, 'list', 'bulleted-list')}
      />
      {/* <ButtonConfig tip='TITULO 2' icon="fas fa-list-ol" active={isBlockProps(editor, 'list', 'numbered-list')} action={() => setPropsOrRemove(editor, 'list', 'numbered-list')} /> */}
      <ButtonConfig
        tip='LISTA CON CUADROS'
        icon='fas fa-list'
        active={isBlockProps(editor, 'list', 'list-item')}
        action={() => setPropsOrRemove(editor, 'list', 'list-item')}
      />
    </ButtonGroup>
  )
}

// export const BlockSelector = () => {
//     const editor = useSlate();
//     const set = (e: React.ChangeEvent<HTMLSelectElement>) => toggleBlock(editor, e.currentTarget.value);
//     const s = { height: 24 }
//     return <InputGroup className='ml-2' data-tip='TIPOS DE PARRAFOS DISPONIBLES' style={{ ...s, width: '210' }}>
//         <InputGroup.Prepend style={{ ...s, width: '75PX' }}>
//             PARRAFO
//         </InputGroup.Prepend>
//         <FormControl style={{ ...s, padding: '0 0 0 0' }} className='form-control-sm' as='select' onChange={set}>
//             <option value='paragraph' selected={isBlockActive(editor, 'paragraph')}>TEXTO</option>
//             <option value='heading-one' selected={isBlockActive(editor, 'heading-one')}>TITULO 1</option>
//             <option value='heading-two' selected={isBlockActive(editor, 'heading-two')}>TITULO 2</option>
//             <option value='heading-tre' selected={isBlockActive(editor, 'heading-tre')}>TITULO 3</option>
//             <option value='heading-for' selected={isBlockActive(editor, 'heading-for')}>TITULO 4</option>
//             <option value='bulleted-list' selected={isBlockActive(editor, 'bulleted-list')}>VIÑETA</option>
//             <option value='numbered-list' selected={isBlockActive(editor, 'numbered-list')}>LISTA NUMERADA</option>
//         </FormControl>
//     </InputGroup>
// }
