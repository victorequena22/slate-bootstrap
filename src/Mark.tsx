import React, { CSSProperties } from 'react'

export const Leaf = ({ attributes, children, leaf }: any) => {
  const { color, fontFamily, fontSize, bold, italic, underline, backgroundColor } = leaf
  const style: CSSProperties = {
    color,
    backgroundColor: backgroundColor ? backgroundColor : '#00000000',
    fontFamily: fontFamily ? fontFamily : 'FormaDJRTextRegularTesting',
    fontSize: fontSize ? `${fontSize / 10}rem` : undefined,
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: underline ? 'underline' : 'none',
  }
  return (
    <span style={style} {...attributes}>
      {children}
    </span>
  )
}
