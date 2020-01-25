
const INITIAL_STATE = {
  isSignedIn: null
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type)  {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, userId: action.payload.userId }
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, userId: action.payload.userId }
    default:
      return state;
  }
}

export default authReducer;
