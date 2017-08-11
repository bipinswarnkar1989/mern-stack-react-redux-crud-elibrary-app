// ./src/reducers/favouriteReducers.js
const INITIAL_STATE = {
  favourites:[], isFetching:false, error:null, newFavourite:null,
  deleteFav:{
    showDeleteModal: false,
    favToDelete: null,
    isFetching: false,
    error: null,
    successMsg:null
  }
}

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

    case 'SHOW_DELETE_MODAL':
 	 			return{
 	 				...currentState, favourites:[...currentState.favourites], isFetching:false, error:null, newFavourite:null, deleteFav: {showDeleteModal:true, favToDelete:action.favToDelete}
 	 			}

    case 'HIDE_DELETE_MODAL':
        return{
          ...currentState, favourites:[...currentState.favourites], isFetching:false, error:null, newFavourite:null, deleteFav: {showDeleteModal:false, favToDelete:null}
        }

    case 'CONFIRM_DELETE_FAVOURITE_REQUEST':
        return{
          ...currentState, favourites:[...currentState.favourites], isFetching:false, error:null, newFavourite:null, deleteFav: {showDeleteModal:true, favToDelete:action.favToDelete, isFetching:true,error:null,successMsg:null}
        }

    case 'CONFIRM_DELETE_FAVOURITE_REQUEST_FAILED':
        return{
          ...currentState, favourites:[...currentState.favourites], isFetching:false, error:null, newFavourite:null, deleteFav: {showDeleteModal:true, favToDelete:action.favToDelete, isFetching:false,error:action.message,successMsg:null}
        }

    case 'CONFIRM_DELETE_FAVOURITE_REQUEST_SUCCESS':
        const filteredFavs = currentState.favourites.filter(fav => fav._id !== action.deletedFavId);
        return{
          ...currentState, favourites:filteredFavs, isFetching:false, error:null, newFavourite:null, deleteFav: {showDeleteModal:true, favToDelete:null, isFetching:false,error:null,successMsg:action.message}
        }


    default:
        return currentState;

  }
}
