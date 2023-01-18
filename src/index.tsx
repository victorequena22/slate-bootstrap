import { Col } from 'react-bootstrap'
import { Editable, withReact, Slate, ReactEditor } from 'slate-react'
import { createEditor } from 'slate'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { withHistory } from 'slate-history'
import { EditModal } from './Modal'
import { AlingMenu, ListMenu, TabsMenu, TypeMenu } from './BlockProps'
import { BlockElement, defaultBlock, getText, setText as st } from './Data'
import { Element } from './Element'
import { Leaf } from './Mark'
import { ColorButton, BackButton, FontSize, FontsFamily, toggleMark, FontStyle, MarkMenu } from './MarkProps'
import { hotKeysValue } from './HotKeys'
import { VerElement, VerLeaf } from './Ver'
import React from 'react'
export { EditModal }
export interface Props {
  value: BlockElement[]
  onChange: (value: BlockElement[]) => void
  id?: string | number
  error?: string
}
export const Texto = ({ value, onChange, id, error }: Props) => {
  const renderElement = useCallback((props: any) => {
    return <Element {...props} />
  }, [])
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, [])
  const editor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
  const [text, setText] = useState(value.length ? st(value) : defaultBlock)
  const [up, setUP] = useState(false)
  const setHtml = useCallback(() => onChange(getText(text)), [text, onChange])
  useEffect(() => {
    setTimeout(() => setUP(!up), 1)
    // eslint-disable-next-line
  }, [text])
  // eslint-disable-next-line
  useEffect(() => setHtml(), [up])
  return (
    <Slate editor={editor} value={text as any} onChange={setText as any}>
      <Col className='d-flex' xs={12}>
        <MarkMenu />
        <ColorButton />
        <BackButton />
        <AlingMenu />
        <TabsMenu />
        <ListMenu />
        <TypeMenu />
        <FontStyle />
      </Col>
      <Col xs={12} className='mt-1'>
        {error ? <small style={{ color: '#dc3545' }}>{error}</small> : <></>}
        <Editable
          id={'slate' + id}
          key={'' + Math.random()}
          spellCheck
          style={{
            padding: '.5rem .5rem .5rem .5rem',
            border: error ? 'solid 1px #dc3545' : 'solid 1px #ced4da',
            width: '100%',
            minWidth: '100px',
            overflowX: 'hidden',
            maxHeight: '70vh',
            minHeight: '30px',
            overflowY: 'auto',
            borderRadius: '.25rem',
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event: any) => hotKeysValue(editor, event)}
        />
      </Col>
    </Slate>
  )
}

export function TextToHTML({ text }: { text: BlockElement[] }) {
  return (
    <>
      {text.map((e) => (
        <VerElement key={JSON.stringify(e)} element={e}>
          {e.children.map((a) => (
            <VerLeaf key={a.text} leaf={a} />
          ))}
        </VerElement>
      ))}
    </>
  )
}
export type { BlockElement }
export {
  defaultBlock,
  getText,
  st as setText,
  Element,
  Leaf,
  AlingMenu,
  ListMenu,
  TabsMenu,
  TypeMenu,
  ColorButton,
  FontStyle,
  MarkMenu,
  BackButton,
  FontSize,
  FontsFamily,
  toggleMark,
}
