type SelectorType = 'PLAIN' | 'ID' | 'CLASSNAME'

type QuerySelectorProps = { selector: string; type?: SelectorType }

export const $ = ({ selector, type = 'ID' }: QuerySelectorProps) => {
  if (type === 'ID') {
    return document.querySelector('#' + selector) as HTMLElement
  }

  if (type === 'CLASSNAME') {
    return document.querySelector('.' + selector) as HTMLElement
  }

  return document.querySelector(selector) as HTMLElement
}
