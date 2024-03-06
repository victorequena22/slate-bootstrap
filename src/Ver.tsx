import React, { CSSProperties } from 'react'
import { BlockElement, BockType, Child } from './Data'

export const VerElement = (p: { element: BlockElement; children: any }) => <Block {...p} />
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
const getCSS = ({ align, tabs, type, list, children }: BlockElement): CSSProperties => {
  const font = getFontSize(type) / 10
  const t2 = tabs * 2
  const t = list === 'paragraph' ? t2 : t2 + font
  const s =
    list === 'paragraph'
      ? {}
      : {
        display: 'list-item',
        listStyleType: list === 'bulleted-list' ? 'disc' : 'square',
      }
  const color = children[0] ? children[0].color : '#000';
  return {
    float: 'right',
    textAlign: align,
    padding: '0 0 0 0',
    fontSize: `${font}rem`,
    minHeight: `${font}rem`,
    width: `calc(100% - ${t + 0.1}rem)`,
    margin: '.05rem .05rem .05rem .05rem',
    ...s, color
  }
}
const getFontSize = (type: BockType) => {
  if (type === 'heading-one') return 26
  if (type === 'heading-two') return 22
  if (type === 'heading-tre') return 18
  if (type === 'heading-for') return 14
  return 10
}
