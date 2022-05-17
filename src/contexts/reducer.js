export const initialState = {
  active: 0,
};

export const actionTypes = {
  SET_ACTIVE: "SET_ACTIVE",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_ACTIVE:
      return {
        ...state,
        active: action.active,
      };
    default:
      return state;
  }
};

export default reducer;
