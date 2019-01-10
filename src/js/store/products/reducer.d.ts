import * as Types from '~types/index'

export interface IProduct {
  productId: string,
  name: { value: string, readonly?: boolean},
  description: {value: string, readonly?: boolean},
  productGroups: { value: Array<number>, readonly?: boolean},
  paymentTypes: { value: Array<number>, readonly?: boolean },
  picture: {value: string, readonly?: boolean},
  active: {value: boolean, readonly?: boolean}
}

export interface IPaymentTypes {
  options: Array<{value: number, label: string}>,
  optionsMap: {[key: string]: string}
}

export interface IProductGroups extends IPaymentTypes {}

export interface IState {
  readonly isLoadProducts: Types.TLoadingFlag
  readonly isSaveRun: Types.TLoadingFlag
  readonly list: string[]
  readonly data: {[key: string]: IProduct }
  readonly unsavedList: string[]
  readonly unsavedData: {[key: string]: IProduct }
  readonly productGroups: IProductGroups & { isLoad: Types.TLoadingFlag }
  readonly paymentTypes: IPaymentTypes & { isLoad: Types.TLoadingFlag }
}