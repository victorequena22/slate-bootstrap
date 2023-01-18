import { EditModal } from './Modal'
import { AlingMenu, ListMenu, TabsMenu, TypeMenu } from './BlockProps'
import { BlockElement, defaultBlock, getText, setText } from './Data'
import { Element } from './Element'
import { Leaf } from './Mark'
import { ColorButton, BackButton, FontSize, FontsFamily, toggleMark, FontStyle, MarkMenu } from './MarkProps'
import { hotKeysValue } from './HotKeys'
import { VerElement, VerLeaf } from './Ver'
import { Props, Texto, TextToHTML } from './Main'
export type { BlockElement, Props as slateProps }
export {
  VerElement,
  VerLeaf,
  defaultBlock,
  hotKeysValue,
  Texto,
  TextToHTML,
  getText,
  setText,
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
  EditModal,
}
