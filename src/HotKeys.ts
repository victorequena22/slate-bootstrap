import isHotkey from 'is-hotkey'
import { toggleMark } from './MarkProps'
import { getTabs, setTabs } from './BlockUtils'

type hkeyM = 'ctrl+b' | 'ctrl+i' | 'ctrl+u'
type hkeyE = 'tab' | 'shift+tab'
const hotKeysMarks = {
  'ctrl+b': 'bold',
  'ctrl+i': 'italic',
  'ctrl+u': 'underline',
}
const hotKeyElement = {
  tab: 'indent',
  'shift+tab': 'outdent',
}
export const hotKeysValue = (editor: any, event: any) => {
  for (const hotkey in hotKeysMarks) {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault()
      const mark = hotKeysMarks[hotkey as hkeyM]
      toggleMark(editor, mark)
    }
  }
  for (const hotkey in hotKeyElement) {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault()
      const props = hotKeyElement[hotkey as hkeyE]
      if (props === 'indent' || props === 'outdent') {
        const tab = getTabs(editor)
        if (props === 'indent') {
          setTabs(editor, tab + 1)
        } else {
          setTabs(editor, tab - 1)
        }
      }
    }
  }
}
