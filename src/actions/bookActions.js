// ./src/actions/bookActions.js
import Axios from 'axios';

//API URL
const apiUrl = 'http://localhost:3000/api/';

export const hideBookMessage = () => {
  return {
    type:'HIDE_BOOK_MESSAGE'
  }
}

export const fetchBooksRequest = () => {
  return {
    type:'FETCH_BOOK_REQUEST'
  }
}


//Sync action
export const fetchBooksSuccess = (books) => {
  return {
    type: 'FETCH_BOOK_SUCCESS',
    books: books,
    receivedAt: Date.now
  }
};

//Async action
export const fetchBooks = () => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  return (dispatch) => {

    dispatch(fetchBooksRequest());
    // Returns a promise
    return Axios.get(apiUrl + 'book')
                .then(response => {
                  // dispatch another action
                  // to consume data
                  dispatch(fetchBooksSuccess(response.data.books))
                })
                .then(error => {
                  throw(error);
                })
  }
}


// Sync action
export const createBookSuccess = (book) => {
  return {
    type: 'CREATE_BOOK_SUCCESS',
    book
  }
}

export const createBookRequest = () => {
  return {
    type:'CREATE_BOOK_REQUEST'
  }
}

export const createBookFailed = (message) => {
  return {
    type:'CREATE_BOOK_REQUEST_FAILED',
    message
  }
}

export const createBook = (book) => {
  //Return action
  return (dispatch) => {
       dispatch(createBookRequest());
    return Axios.post(apiUrl + 'book', book)
                .then(response => {
                  if(response.data.success){
                  // dispatch a synchronus action
                  // to handle data
                  dispatch(createBookSuccess(response.data.book));
                }
                else{
                  dispatch(createBookFailed(response.data.message));
                }
                })
                .then(error => {
                  console.log(error);
                })
  }
};



//Sync action
export const fetchBookByIdSuccess = (book) => {
  return {
    type: 'FETCH_BOOK_BY_ID_SUCCESS',
    book
  }
}

//Async action
export const fetchBookById = (bookId) => {
  //Return action
  return (dispatch) => {
    return Axios.get(apiUrl + 'book/' + bookId)
                .then(response => {
                  //Handle data with sync action
                  dispatch(fetchBookByIdSuccess(response.data.book[0]))
                })
                .catch(error => {
                  throw(error);
                })
  }
};

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
export const showDeleteModal = (bookToDelete) => {
  return{
    type: 'SHOW_DELETE_MODAL',
    bookToDelete
  }
}

export const hideDeleteModal = () => {
  return{
    type: 'HIDE_DELETE_MODAL'
  }
}

export const confirmDeleteBookRequest = (bookToDelete) => {
  return{
    type: 'CONFIRM_DELETE_BOOK_REQUEST',
    bookToDelete
  }
}

export const confirmDeleteBookRequestSuccess = (message, deletedBookId) => {
  return{
    type: 'CONFIRM_DELETE_BOOK_REQUEST_SUCCESS',
    message:message,
    deletedBookId:deletedBookId
  }
}

export const confirmDeleteBookRequestFailed = (message) => {
  return{
    type: 'CONFIRM_DELETE_BOOK_REQUEST_FAILED',
    message
  }
}

export const confirmDeleteBook = (bookToDelete) => {
    return (dispatch) => {
      dispatch(confirmDeleteBookRequest(bookToDelete));
      return Axios.delete(apiUrl + 'book/' + bookToDelete._id)
                  .then(response => {console.log(response);
                    if(response.data.success){
                      //dispatch another action to consume data
                       dispatch(confirmDeleteBookRequestSuccess(response.data.message,bookToDelete._id));
                    }
                    else{
                      //dispatch another action to consume data
                       dispatch(confirmDeleteBookRequestFailed(response.data.message));
                    }
                  })
                  .catch((error) => {
                     //dispatch(confirmDeleteBookRequestFailed(error));
                  })
    }
}
