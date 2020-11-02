interface MessageState {
  messages: string[];
}

const INITIAL_STATE = {
  messages: {},
};

type Action = { type: 'MESSAGE_SET'; payload: any } | { type: 'MESSAGE_CLEAR' };

export const messageReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'MESSAGE_SET': {
      return { ...state, messages: action.payload };
    }
    case 'MESSAGE_CLEAR': {
      return { ...state, messages: [] };
    }
    default:
      return state;
  }
};
