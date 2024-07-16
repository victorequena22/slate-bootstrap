import React from 'react'
import { CSSProperties } from 'react'
import { BlockElement, BockType, Child } from './Data'


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
    const { attributes, children, element, } = p;
    return <Block attributes={attributes} element={element}>
        <ListElement attributes={attributes} element={element}>
            {children}
        </ListElement>
    </Block>
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

const ListElement = ({ element, children }: { element: BlockElement, attributes: any, children: any }) => {
    const { list } = element;
    return list === 'paragraph' ? <>{children}</> : <div style={getCSSList(element)}>
        {children}
    </div>
}

const getCSSList = ({ tabs, type, list, children, align }: BlockElement): CSSProperties => {
    const font = getFontUsa(type, children[0]) / 10;
    const t2 = tabs * 2;
    const t = list === 'paragraph' ? t2 : t2 + font
    const s = list === 'paragraph' ? {} : { display: 'list-item', listStyleType: list === 'bulleted-list' ? 'disc' : 'square' }
    return {
        padding: '0 0 0 0', width: `fit-content`, ...s, marginLeft: `${t}rem`, textAlign: align
    }
}

