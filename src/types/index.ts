export type TMatchType =
  | {
      type: 'over'
      value?: string
    }
  | {
      type: 'regex'
      value: RegExp
    }

export interface ITypeInAction {
  name: string
  match: TMatchType
  icon: string
  description: string
  sortWeight?: number
  isActive?: boolean
}
