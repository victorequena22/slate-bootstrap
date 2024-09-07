export type BockType = 'heading-one' | 'heading-two' | 'heading-tre' | 'heading-for' | 'paragraph'
export type Align = 'left' | 'right' | 'center' | 'justify'
export type Tabs = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type List = 'bulleted-list' | 'numbered-list' | 'list-item' | 'paragraph'
export interface BlockElement {
  type: BockType
  align: Align
  tabs: Tabs
  list: List
  children: Child[]
}
export interface Child {
  backgroundColor?: string
  color: string
  fontFamily: string
  fontSize?: number
  bold: boolean
  italic: boolean
  underline: boolean
  text: string
}
export const characters = (text: BlockElement[]) =>
  text.map(({ children }) => children.map(({ text }) => text).join('')).join(' ')

export const defaulHtml = `<p class='text-left' style="width: 100%;"></p>`
export const defaultChild: Child[] = [
  { color: '#000000', fontFamily: 'Arial', bold: false, italic: false, underline: false, text: '' },
]
export const defaultBlock: BlockElement[] = [
  { type: 'paragraph', list: 'paragraph', align: 'left', tabs: 0, children: defaultChild },
]
export const t = `data-slate-node="text"`
export const t1 = `data-slate-node="element"`
export const t2 = `data-slate-leaf="true"`
export const t3 = `data-slate-string="true"`

export function getHTML(id?: string | number) {
  const div = document.getElementById('slate' + id)
  if (div !== null) return div.innerHTML.replaceAll(t, '').replaceAll(t1, '').replaceAll(t2, '').replaceAll(t3, '')
  return ''
}
type BlockElementFun = (text: BlockElement[]) => BlockElement[];
export const getText: BlockElementFun = (text) => text.map((b) => ({ ...b, children: b.children.map((c) => ({ ...c, text: c.text.replaceAll('"', '¤') })) }))
export const setText: BlockElementFun = (text) => text.map((b) => ({ ...b, children: b.children.map((c) => ({ ...c, text: c.text.replaceAll('¤', '"') })) }))
export const getTextFormat = (text: BlockElement[]) => text.map(({ children }) => children.map((c) => c.text).join("\n")).join("\n")
