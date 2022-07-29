interface ICommonObject {
  [key: string]: any
}

const deepCopy = (obj: ICommonObject) => {
  const tmp = JSON.stringify(obj)
  return JSON.parse(tmp)
}

export { deepCopy }
