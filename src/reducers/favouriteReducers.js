// ./src/reducers/cartReducers.js
export const favouriteReducers = (currentState = [], action) =>{
  switch (action.type) {
    case 'ADD_TO_FAVOURITE_SUCCESS':
        return action.item;

    case 'FETCH_FAVOURITE_SUCCESS':
          return action.items;

      break;


    default:
        return currentState;

  }
}
