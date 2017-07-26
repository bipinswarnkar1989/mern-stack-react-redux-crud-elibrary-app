// ./src/reducers/favouriteReducers.js
export default (currentState = [], action) =>{
  switch (action.type) {
    case 'ADD_TO_FAVOURITE_SUCCESS':
    const nextState = [
      ...currentState,
      Object.assign({}, action.item)
    ];
         return nextState;

    case 'FETCH_FAVOURITE_SUCCESS':
          return action.items;


    default:
        return currentState;

  }
}
