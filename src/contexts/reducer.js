export const initialState = {
  bubbleData: {
    active: 0,
    compareA: 0,
    compareB: 1,
    sorted: false,
  },
  selectData: {
    active: 0,
    currMin: 0,
    sorted: false,
  },
  mergeData: {
    active: 0,
    heights: {},
    sorted: false,
  },
};

export const actionTypes = {
  SET_BUBBLE_DATA: "SET_BUBBLE_DATA",
  SET_SELECT_DATA: "SET_SELECT_DATA",
  SET_MERGE_DATA: "SET_MERGE_DATA",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_BUBBLE_DATA:
      return {
        ...state,
        bubbleData: action.bubbleData,
      };
    case actionTypes.SET_SELECT_DATA:
      return {
        ...state,
        selectData: action.selectData,
      };
    case actionTypes.SET_MERGE_DATA:
      return {
        ...state,
        mergeData: action.mergeData,
      };
    default:
      return state;
  }
};

export default reducer;
