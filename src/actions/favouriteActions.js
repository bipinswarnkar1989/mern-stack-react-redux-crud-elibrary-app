// ./src/actions/favouriteActions.js
// ./src/actions/bookActions.js
import Axios from 'axios';

//API URL
const apiUrl = 'http://localhost:3000/api/';

export const addToFavouriteRequest = () => {
  return{
    type: 'ADD_TO_FAVOURITE_REQUEST'
  }
}

//Sync action
export const addToFavouriteSuccess = (item) => {
  return {
    type: 'ADD_TO_FAVOURITE_SUCCESS',
    item
  }
}

export const addToFavouriteFailed = (message) => {
  return{
    type: 'ADD_TO_FAVOURITE_FAILED',
    message
  }
}

//Async action
export const addToFavourite = (item) => {
  //Return action
  return (dispatch) => {
        dispatch(addToFavouriteRequest());
    return Axios.post(apiUrl + 'favourite', item)
                .then(response => {
                  if(response.data.success){
                  //Handle date with sync action
                  dispatch(addToFavouriteSuccess(response.data.f))
                }
                else{
                    dispatch(addToFavouriteFailed(response.data.message));
                }
                })
                .catch(error => {
                  throw(error);
                })
  }
};

export const fetchFavouriteRequest = () => {
  return{
    type: 'FETCH_FAVOURITE_REQUEST'
  }
}

//Sync action
export const fetchFavouriteSuccess = (items) => {
  return {
    type: 'FETCH_FAVOURITE_SUCCESS',
    items
  }
}

//Async action
export const fetchFavourite = () => {
  return (dispatch) => {
          dispatch(fetchFavouriteRequest());
    return Axios.get(apiUrl + 'favourite')
                .then(response => {
                  dispatch(fetchFavouriteSuccess(response.data.favourites))
                })
                .catch(error => {
                  throw(error);
                })
  }
}

//sync action to show Delete book model
export const showDeleteModal = (favToDelete) => {
  return{
    type: 'SHOW_DELETE_MODAL',
    favToDelete
  }
}

export const hideDeleteModal = () => {
  return{
    type: 'HIDE_DELETE_MODAL'
  }
}

export const confirmDeleteFavouriteRequest = (favToDelete) => {
  return{
    type: 'CONFIRM_DELETE_FAVOURITE_REQUEST',
    favToDelete
  }
}

export const confirmDeleteFavouriteRequestSuccess = (message, deletedFavId) => {
  return{
    type: 'CONFIRM_DELETE_FAVOURITE_REQUEST_SUCCESS',
    message:message,
    deletedFavId:deletedFavId
  }
}

export const confirmDeleteFavouriteRequestFailed = (message) => {
  return{
    type: 'CONFIRM_DELETE_FAVOURITE_REQUEST_FAILED',
    message
  }
}


export const confirmDeleteFavourite = (favToDelete) => {
    return (dispatch) => {
      dispatch(confirmDeleteFavouriteRequest(favToDelete));
      return Axios.delete(apiUrl + 'favourite/' + favToDelete._id)
                  .then(response => {console.log(response);
                    if(response.data.success){
                      //dispatch another action to consume data
                       dispatch(confirmDeleteFavouriteRequestSuccess(response.data.message,favToDelete._id));
                    }
                    else{
                      //dispatch another action to consume data
                       dispatch(confirmDeleteFavouriteRequestFailed(response.data.message));
                    }
                  })
                  .catch(error => {
                     dispatch(confirmDeleteFavouriteRequestFailed(error));
                  })
    }
}
