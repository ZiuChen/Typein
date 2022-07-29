import { calc } from '@/utils'
import type { IMsgReq, TMsgRes } from '@/types'

const caculate = (
  filterValue: IMsgReq['payload']['filterValue'],
  sendResponse: (res: TMsgRes) => void
) => {
  const result = calc(filterValue!)
  sendResponse({
    queryValue: '',
    list: [
      {
        name: `${filterValue}=${result}`,
        description: '计算结果',
        icon: 'caculate',
        action: 'copy',
        data: result
      }
    ]
  })
}

export { caculate }
