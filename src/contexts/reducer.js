export const initialState = {
  active: 0,
  bubbleData: {
    active: 0,
    compareA: 0,
    compareB: 1,
    sorted: false,
  },
};

export const actionTypes = {
  SET_ACTIVE: "SET_ACTIVE",
  SET_BUBBLE_DATA: "SET_BUBBLE_DATA",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_ACTIVE:
      return {
        ...state,
        active: action.active,
      };
    case actionTypes.SET_BUBBLE_DATA:
      return {
        ...state,
        bubbleData: action.bubbleData,
      };
    default:
      return state;
  }
};

export default reducer;
