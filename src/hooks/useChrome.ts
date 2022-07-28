// export function useChrome(funName: string, ...pramas: any) {
//   let callback = function () {}
//   let callbackindex = pramas.findIndex((item: any) => typeof item === 'function')
//   if (callbackindex != -1) {
//     callback = pramas[callbackindex]
//     pramas[callbackindex] = { callback: true }
//   }
//   chrome.runtime.sendMessage(
//     {
//       funType: 'chrome',
//       funName: funName,
//       pramas
//     },
//     (pramas: any) => callback(...pramas)
//   )
// }
