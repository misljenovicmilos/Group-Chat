const INITIAL_STATE = {
  authUser: {},
};

type Action = { type: 'AUTH_USER_SET'; payload: any } | { type: 'AUTH_USER' };
export const sessionReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return { ...state, authUser: action.payload };
    }
    case 'AUTH_USER': {
      return { ...state, authUser: {} };
    }
    default:
      return state;
  }
};
