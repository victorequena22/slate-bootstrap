import React, { CSSProperties } from 'react'
import { BlockElement, BockType, Child } from './Data'

export const VerLeaf = ({ leaf }: { leaf: Child }) => {
  const { color, backgroundColor, fontFamily, fontSize, bold, italic, underline, text } = leaf
  const style = {
    color,
    fontFamily,
    backgroundColor,
    fontSize: fontSize ? `${fontSize / 10}rem` : undefined,
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: underline ? 'underline' : 'none',
  }
  return <span style={style} dangerouslySetInnerHTML={{ __html: text.replaceAll('¤', '"') }} />
}
export const VerElement = (p: { element: BlockElement; children: any }) => <List {...p} />

const List = (p: any) => {
  const { children, element, } = p;
  return <Block element={element}>
    <ListElement element={element}>
      {children}
    </ListElement>
  </Block>
}
const Block = ({ element, children }: { element: BlockElement; children: any }) => {
  switch (element.type) {
    case 'heading-one':
      return <h1 style={getCSS(element)}>{children}</h1>
    case 'heading-two':
      return <h2 style={getCSS(element)}>{children}</h2>
    case 'heading-tre':
      return <h3 style={getCSS(element)}>{children}</h3>
    case 'heading-for':
      return <h4 style={getCSS(element)}>{children}</h4>
    default:
      return <p style={getCSS(element)}>{children}</p>
  }
}
export function TextToHTML({ text }: { text: BlockElement[] }) {
  return <>
    {text.map((e) => (
      <VerElement key={JSON.stringify(e)} element={e}>
        {e.children.map((a) => (
          <VerLeaf key={a.text} leaf={a} />
        ))}
      </VerElement>
    ))}
  </>
}

const getCSS = ({ align, tabs, type, children }: BlockElement): CSSProperties => {
  const font = getFontUsa(type, children[0]) / 10;
  const t2 = tabs * 2;
  const color = children[0] ? children[0].color : '#000';
  return {
    float: 'right', textAlign: align, padding: '0 0 0 0', fontSize: `${font}rem`, minHeight: `${font}rem`,
    width: `calc(100% - ${t2}rem)`, margin: '.05rem .05rem .05rem .05rem', color, display: 'flex',
    justifyContent: align
  }
}
const getFontSize = (type: BockType) => {
  if (type === 'heading-one') return 26
  if (type === 'heading-two') return 22
  if (type === 'heading-tre') return 18
  if (type === 'heading-for') return 14
  return 10
}
const getFontUsa = (type: BockType, children?: Child) => {
  const b = getFontSize(type)
  const c = children?.fontSize;
  if (c) return c < b ? b : c;
  return b;
}
const ListElement = ({ element, children }: { element: any, children: any }) => {
    const { list } = element;
    return list === 'paragraph' ? <div style={getCSSNoList(element)}>{children}</div> : <div style={getCSSList(element)}>
        {children}
    </div>
}

const getCSSList = ({ tabs, type, list, children, align }: any): CSSProperties => {
    const font = getFontUsa(type, children[0]) / 10;
    const t2 = tabs * 2;
    const t = list === 'paragraph' ? t2 : t2 + font
    const s = list === 'paragraph' ? {} : { display: 'list-item', listStyleType: list === 'bulleted-list' ? 'disc' : 'square' }
    return {
        padding: '0 0 0 0', width: `fit-content`, ...s, marginLeft: `${t}rem`, textAlign: align
    }
}
const getCSSNoList = ({ align }: any): CSSProperties => {
    return {
        padding: '0 0 0 0', width: `fit-content`, textAlign: align
    }
}