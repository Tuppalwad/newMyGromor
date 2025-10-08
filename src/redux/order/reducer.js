import {isEmpty} from '../../utils/validator';
import {OrderType} from './type';
const initialState = {ongoing: [], completed: [], cancelled: []};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case OrderType.completedOrder + '_SUCCESS':
      const completedList = appendData(state.completed, action.payload);
      return {
        ...state,
        completed: completedList,
      };

    default:
      return {...state};
  }
};
export default orderReducer;

export const appendData = (oldData, newData) => {
  if (oldData === null) {
    return newData;
  }
  if (oldData?.pageNo === newData?.pageNo) {
    return newData;
  }

  if (isEmpty(oldData)) {
    let tempData = {
      ...newData,
      data: newData?.data,
    };
    return tempData;
  } else {
    let tempData = {
      ...newData,
      data: [...oldData?.data, ...newData?.data],
    };
    return tempData;
  }
};
