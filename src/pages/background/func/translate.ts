import type { TMsgRes } from '@/types'
import trans from 'google-translate-api-x'

const translate = async (text: string, sendResponse: (res: TMsgRes) => void) => {
  const hasChinese = /[^\x00-\x80]/.test(text)
  const target = hasChinese ? 'en' : 'zh-CN' // 包含中文则翻译为英文 否则为中文
  return await trans(text, { to: target, tld: 'cn' }).then((result) => {
    const { text } = result
    sendResponse({
      queryValue: '',
      list: [
        {
          name: text,
          description: '按下回车复制翻译结果',
          icon: 'translate',
          action: 'copy',
          data: text
        }
      ]
    })
  })
}

export { translate }
