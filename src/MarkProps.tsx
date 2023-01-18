import { ButtonGroup, FormControl, InputGroup } from 'react-bootstrap'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'
import { ButtonColor, ButtonConfig, InputNumber } from 'component-bootstrap'
import { isBlockProps } from './BlockProps'
import { fontsFamily } from './FontsFamily'
import React from 'react'
interface IProps {
  left?: number
}
export const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
const getFontSize = (editor: any) => {
  if (isBlockProps(editor, 'type', 'heading-one')) return 26
  if (isBlockProps(editor, 'type', 'heading-two')) return 22
  if (isBlockProps(editor, 'type', 'heading-tre')) return 18
  if (isBlockProps(editor, 'type', 'heading-for')) return 14
  return 10
}
const isMarkActive = (editor: any, format: any) => {
  const marks: any = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
export const MarkButton = ({ format, icon, tip }: any) => {
  const editor = useSlate()
  return (
    <ButtonConfig
      icon={icon}
      tip={tip}
      active={isMarkActive(editor, format)}
      action={() => toggleMark(editor, format)}
    />
  )
}
interface ColorProps extends IProps {
  colores?: string[]
}
export const ColorButton = ({ left = 2, colores }: ColorProps) => {
  const editor = useSlate()
  const marks: any = Editor.marks(editor)
  const is = marks !== null && marks.color !== undefined
  const color = is ? marks.color : '#000000'
  const style = { width: 32, height: 24, margin: '0 0 0 0', padding: '.25rem .5rem .25rem .5rem' }
  return (
    <ButtonColor
      colores={colores}
      className={`ml-${left}`}
      tip='COLOR DE TEXTO'
      style={style}
      color={color}
      invert={true}
      setData={(color) => Editor.addMark(editor, 'color', color)}
      click={() => (is ? Editor.addMark(editor, 'color', 'currentColor') : Editor.addMark(editor, 'color', color))}
    >
      <i className='fas fa-font'></i>
    </ButtonColor>
  )
}
export const BackButton = ({ left = 2, colores }: ColorProps) => {
  const editor = useSlate()
  const marks: any = Editor.marks(editor)
  const is = marks !== null && marks.backgroundColor !== undefined
  const color = is ? marks.backgroundColor : '#00000000'
  const style = { width: 32, height: 24, margin: '0 0 0 0', padding: '.25rem .5rem .25rem .5rem' }
  return (
    <ButtonColor
      colores={colores}
      className={`ml-${left}`}
      tip='RESALTAR TEXTO'
      style={style}
      color={color}
      setData={(backgroundColor) => Editor.addMark(editor, 'backgroundColor', backgroundColor)}
      click={() =>
        is ? Editor.addMark(editor, 'backgroundColor', '#00000000') : Editor.addMark(editor, 'backgroundColor', color)
      }
    >
      <i className='fas fa-paint-roller'></i>
    </ButtonColor>
  )
}
export const FontsFamily = () => {
  const editor = useSlate()
  const marks: any = Editor.marks(editor)
  const is = marks !== null && marks.fontFamily !== undefined
  const fontFamily = is ? marks.fontFamily : 'Arial'
  const set = (e: React.ChangeEvent<HTMLSelectElement>) => Editor.addMark(editor, 'fontFamily', e.currentTarget.value)
  return (
    <FormControl
      data-tip='ESTILO DE FUENTE'
      style={{ fontFamily, height: '24px', borderRadius: '.25rem 0 0 .25rem', padding: '0 0 0 0' }}
      className='form-control-sm'
      as='select'
      onChange={set}
      value={fontFamily}
    >
      {fontsFamily.map((c, i) => (
        <option style={{ fontFamily: c }} key={`fuente${i}`}>
          {c}
        </option>
      ))}
    </FormControl>
  )
}
export const FontSize = () => {
  const editor = useSlate()
  const marks: any = Editor.marks(editor)
  const is = marks !== null && marks.fontSize !== undefined
  const fontSize = is ? marks.fontSize : getFontSize(editor)
  return (
    <InputNumber
      data-tip='TAMAÑO DE FUENTE'
      decimal={0}
      style={{ borderRadius: '0 .25rem .25rem 0', height: 24 }}
      value={fontSize}
      setData={(s) => Editor.addMark(editor, 'fontSize', s)}
    />
  )
}
export const FontStyle = ({ left = 2, width = '290px' }: IProps & { width?: string }) => {
  const s = { height: 24 }
  return (
    <InputGroup className={`m-0 p-0 ml-${left}`} style={{ ...s, width }}>
      <InputGroup.Prepend style={{ ...s, width: 'calc(100% - 60px)' }}>
        <FontsFamily />
      </InputGroup.Prepend>
      <InputGroup.Append style={{ ...s, width: '60px' }}>
        <FontSize />
      </InputGroup.Append>
    </InputGroup>
  )
}
export const MarkMenu = ({ left = 0 }: IProps) => {
  return (
    <ButtonGroup className={`ml-${left}`}>
      <MarkButton tip='NEGRITAS' format='bold' icon=' fas fa-bold' />
      <MarkButton tip='CURSIVA' format='italic' icon='fas fa-italic' />
      <MarkButton tip='SUBRRAYADO' format='underline' icon='fas fa-underline' />
    </ButtonGroup>
  )
}
