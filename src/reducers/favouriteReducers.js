// ./src/reducers/favouriteReducers.js
export default (currentState = [], action) =>{
  switch (action.type) {
    case 'ADD_TO_FAVOURITE_SUCCESS':
        return action.item;

    case 'FETCH_FAVOURITE_SUCCESS':
          return action.items;


    default:
        return currentState;

  }
}
