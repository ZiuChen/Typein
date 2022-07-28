import { calc } from './calc'
import { copyText } from './copyText'

interface ICommonObject {
  [key: string]: any
}

const deepCopy = (obj: ICommonObject) => {
  const tmp = JSON.stringify(obj)
  return JSON.parse(tmp)
}

export { calc, copyText, deepCopy }
