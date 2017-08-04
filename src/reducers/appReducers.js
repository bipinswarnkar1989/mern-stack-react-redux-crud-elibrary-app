// ./src/reducers/appReducers.js
const INITIAL_STATE = {
  showAddBook: false
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_BOOK':
          return {
            ...currentState,showAddBook: !currentState.showAddBook
          }


    default:
       return currentState;

  }
}

export default appReducer;
