const INCREMENT = "increment";
const DECREMENT = "decrement";
const INCREMENTBYVALUE = "incrementbyvalue";

const inititalState = {
  count: 0,
};

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const incrementByValue = (value) => ({
  type: INCREMENTBYVALUE,
  payload: value,
});

function counterReducer(state = inititalState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case INCREMENTBYVALUE:
      return {
        ...state,
        count: state.count + action.payload,
      };

    default:
      return state;
  }
}

export default counterReducer;
