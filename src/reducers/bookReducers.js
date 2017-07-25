// ./src/reducers/bookReducers.js

// For handling array of books
export const booksReducer =  (currentState = [], action) => {
  switch (action.type) {
    case 'CREATE_BOOK_SUCCESS':
           const nextState = [
             ...currentState,
             Object.assign({}, action.book)
           ];
      return nextState;

   case 'FETCH_BOOK_SUCCESS':
          return action.books;


    default:
        return currentState;

  }
};

export const bookReducer = (currentState = [], action) => {
  switch (action.type) {
    case 'FETCH_BOOK_BY_ID_SUCCESS':
      return action.book;
    default:
      return currentState;
  }
};
