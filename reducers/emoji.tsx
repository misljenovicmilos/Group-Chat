interface MessageState {
  messages: string[];
}

const INITIAL_STATE = {
  emoji: {},
};

type Action = { type: 'EMOJI_SET'; payload: any };

export const emojiReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'EMOJI_SET': {
      return { ...state, emoji: action.payload };
    }

    default:
      return state;
  }
};
