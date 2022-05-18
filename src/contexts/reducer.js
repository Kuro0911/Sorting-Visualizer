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
  insertData: {
    hole: 0,
    active: 1,
  },
  quickData: {
    active: 0,
  },
};

export const actionTypes = {
  SET_BUBBLE_DATA: "SET_BUBBLE_DATA",
  SET_SELECT_DATA: "SET_SELECT_DATA",
  SET_MERGE_DATA: "SET_MERGE_DATA",
  SET_INSERT_DATA: "SET_INSERT_DATA",
  SET_QUICK_DATA: "SET_QUICK_DATA",
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
    case actionTypes.SET_INSERT_DATA:
      return {
        ...state,
        insertData: action.insertData,
      };
    case actionTypes.SET_QUICK_DATA:
      return {
        ...state,
        quickData: action.quickData,
      };
    default:
      return state;
  }
};

export default reducer;
