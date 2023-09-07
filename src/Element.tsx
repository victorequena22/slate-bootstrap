import React from 'react'
import { CSSProperties } from 'react'
import { BlockElement, BockType } from './Data'

export const Element = (p: any) => <List {...p} />
const Block = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'heading-one':
      return <h1 style={getCSS(element)} {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 style={getCSS(element)} {...attributes}>{children}</h2>
    case 'heading-tre':
      return <h3 style={getCSS(element)} {...attributes}>{children}</h3>
    case 'heading-for':
      return <h4 style={getCSS(element)} {...attributes}>{children}</h4>
    default:
      return <p style={getCSS(element)} {...attributes}>{children}</p>
  }
}
const List = (p: any) => {
  const { attributes, children, element } = p
  return <Block attributes={attributes} element={element}>{children}</Block>
}

const getCSS = ({ align, tabs, type, list }: BlockElement): CSSProperties => {
  const font = getFontSize(type) / 10
  const t2 = tabs * 2
  const t = list === 'paragraph' ? t2 : t2 + font
  const s = list === 'paragraph' ? {} : { display: 'list-item', listStyleType: list === 'bulleted-list' ? 'disc' : 'square' }
  return {
    float: 'right', textAlign: align, padding: '0 0 0 0', fontSize: `${font}rem`, minHeight: `${font}rem`,
    width: `calc(100% - ${t + 0.1}rem)`, margin: '.05rem .05rem .05rem .05rem', ...s,
  }
}
const getFontSize = (type: BockType) => {
  if (type === 'heading-one') return 26
  if (type === 'heading-two') return 22
  if (type === 'heading-tre') return 18
  if (type === 'heading-for') return 14
  return 10
}
