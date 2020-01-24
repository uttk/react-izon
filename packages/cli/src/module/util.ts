import {babelTypes} from './types'

export const getComponentName = (jsx: babelTypes.JSXElement): string | '' => {
  const identifier = jsx.openingElement.name

  if (identifier.type === 'JSXIdentifier' && /^[A-Z]+/.test(identifier.name)) {
    return identifier.name
  }

  return ''
}
