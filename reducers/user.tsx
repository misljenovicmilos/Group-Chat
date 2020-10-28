
const INITIAL_STATE = {
  users: {},
};
type Action = { type: 'USER_SET'; payload: any };
export const userReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'USER_SET': {
      return { ...state, users: action.payload };
    }
    default:
      return state;
  }
};
