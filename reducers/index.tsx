import { combineReducers } from 'redux';
import { userReducer } from './user';
import { sessionReducer } from './session';
import { messageReducer } from './message';
import { emojiReducer } from './emoji';
export const rootReducer = combineReducers({
  userState: userReducer,
  sesionState: sessionReducer,
  messageState: messageReducer,
  emojiState: emojiReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
