// ./src/actions/bookActions.js
import Axios from 'axios';

//API URL
const apiUrl = 'http://localhost:8080/api/';

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

export const createBook = (book) => {
  //Return action
  return (dispatch) => {
       dispatch(createBookRequest());
    return Axios.post(apiUrl + 'book', book)
                .then(response => {
                  // dispatch a synchronus action
                  // to handle data
                  dispatch(createBookSuccess(response.data.book))
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

//Async action
export const addToFavourite = (item) => {
  //Return action
  return (dispatch) => {
        dispatch(addToFavouriteRequest());
    return Axios.post(apiUrl + 'favourite', item)
                .then(response => {
                  //Handle date with sync action
                  dispatch(addToFavouriteSuccess(response.data.f))
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
