// ./src/actions/bookActions.js
import Axios from 'axios';

//API URL
const apiUrl = 'http://localhost:8080/api/book/';
//Sync action
export const fetchBooksSuccess = (books) => {
  return {
    type: 'FETCH_BOOK_SUCCESS',
    books
  }
};

//Async action
export const fetchBooks = () => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(apiUrl)
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

export const createBook = (book) => {
  //Return action
  return (dispatch) => {
    return Axios.post(apiUrl, book)
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
    return Axios.get(apiUrl + '/'+ bookId)
                .then(response => {
                  //Handle data with sync action
                  dispatch(fetchBookByIdSuccess(response.data.book))
                })
                .catch(error => {
                  throw(error);
                })
  }
};

//Sync action
export const addToCartSuccess = (item) => {
  return {
    type: 'ADD_TO_CART_SUCCESS',
    item
  }
}

//Async action
export const addToCart = (item) => {
  //Return action
  return (dispatch) => {
    return Axios.post('http://57c64baac1fc8711008f2a82.mockapi.io/Cart', item)
                .then(response => {
                  //Handle date with sync action
                  dispatch(addToCartSuccess(response.data))
                })
                .catch(error => {
                  throw(error);
                })
  }
};

//Sync action
export const fetchCartSuccess = (items) => {
  return {
    type: 'FETCH_CART_SUCCESS',
    items
  }
}

//Async action
export const fetchCart = () => {
  return (dispatch) => {
    return Axios.get('http://57c64baac1fc8711008f2a82.mockapi.io/Cart')
                .then(response => {
                  dispatch(fetchCartSuccess(response.data))
                })
                .catch(error => {
                  throw(error);
                })
  }
}
