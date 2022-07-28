export type TMatchType =
  | {
      type: 'over'
      value?: string
    }
  | {
      type: 'regex'
      value: RegExp
    }

export interface ICommonItem {
  name: string
  icon: string
  description: string
  isActive?: boolean
}

export interface ITypeInAction extends ICommonItem {
  match: TMatchType
  sortWeight?: number
  action:
    | 'search-history'
    | 'search-bookmark'
    | 'open-url'
    | 'translate-bing'
    | 'search-query'
    | 'caculate'
}

export interface IMsgReq {
  type: 'action-activate'
  payload: {
    action: ITypeInAction
    filterValue: string
  }
}

export interface ITableListItem extends ICommonItem {
  action: 'copy' | 'open-url'
}

export type TMsgRes =
  | {
      list: ITableListItem[]
      queryValue: string
    }
  | undefined
