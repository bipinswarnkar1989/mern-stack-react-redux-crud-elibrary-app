// ./src/reducers/favouriteReducers.js
const INITIAL_STATE = {favourites:[], isFetching:false, error:null, newFavourite:null}

export default (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITE_REQUEST':
         return{
           ...currentState, favourites:[...currentState.favourites], isFetching:true, error:null, newFavourite:null
         }

    case 'ADD_TO_FAVOURITE_FAILED':
          return{
            ...currentState, favourites:[...currentState.favourites], isFetching:false, error:action.message, newFavourite:null
          }

    case 'ADD_TO_FAVOURITE_SUCCESS':
    const nextState = { ...currentState, favourites: [
      ...currentState.favourites,
      Object.assign({}, action.item)
    ], isFetching:false, error:null, newFavourite:action.item};
         return nextState;

    case 'FETCH_FAVOURITE_REQUEST':
          return{
            ...currentState, favourites:[...currentState.favourites], isFetching:true, error:null, newFavourite:null
          }

    case 'FETCH_FAVOURITE_SUCCESS':
          return{
            ...currentState, favourites:action.items, isFetching:false, error:null, newFavourite:null
          };


    default:
        return currentState;

  }
}
