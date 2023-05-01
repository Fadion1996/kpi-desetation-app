type toggleType = (flag: boolean) => void;

type stateType = {
  ui: {
    sideBarIsVisible: boolean,
    popupIsVisible: boolean
    popupNotification: {
      isVisible: boolean,
      title: string,
      text: string,
      onSubmit: any
    }
    popupNotificationIsVisible: boolean
  }
  details: {
    assembleItems: [],
    activeAssembleItem: number
    selectedAssembleItem: number
  }
}

type detailType = {
  id: string,
  type: string,
  name: string,
  height: number,
  outerRadius: number,
  innerRadius: number
}

type DetailState = {
  activeAssembleItem: number,
  assembleItems: detailType[],
  selectedAssembleItem: number

  firstDetail: {
    width: number,
    height: number,
    innerRadius: number,
    outerRadius: number
  },
  secondDetail: {
    width: number,
    height: number,
    innerRadius: number,
    outerRadius: number
  }
}

export type myType = 'FFruit' | 'Apple' | 'Tree'

export interface DataObj {
  name: string;
  height: string | number;
  outerRadius: string | number;
  innerRadius: string | number;
}

export type {
  stateType,
  toggleType,
  detailType,
  DetailState
}
