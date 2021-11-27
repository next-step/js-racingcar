type SelectorType = 'PLAIN' | 'ID' | 'CLASSNAME'

export const $ = (selector: string, type: SelectorType = 'ID') => {
  if (type === 'ID') {
    return document.querySelector('#' + selector) as HTMLElement
  }

  if (type === 'CLASSNAME') {
    return document.querySelector('.' + selector) as HTMLElement
  }

  return document.querySelector(selector) as HTMLElement
}
