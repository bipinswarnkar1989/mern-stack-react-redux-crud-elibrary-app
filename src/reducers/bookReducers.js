// ./src/reducers/bookReducers.js

const INITIAL_STATE = { booksList: {books: [], error:null, isFetching: false},
							newBook:{book:null, error: null, isAdding: false},
						};

// For handling array of books
export const booksReducer =  (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_BOOK_REQUEST':
          return { ...currentState, booksList: {books:[...currentState.booksList.books], error:null,isFetching: true},newBook:{book:null, error:null, isAdding:true}};

    case 'CREATE_BOOK_SUCCESS':
          //  const nextState = [
          //    ...currentState,
          //    Object.assign({}, action.book)
          //  ];return { ...state, activePost:{...state.activePost, loading: true}};
          const nextState = { ...currentState, booksList:{books:[...currentState.booksList.books, action.book], isFetching:false},newBook:{book:action.book, error:null, isAdding:false}}
      return nextState;

	 case 'CREATE_BOOK_REQUEST_FAILED':
	       return { ...currentState, booksList:{books:[...currentState.booksList.books], error:null, isFetching:false}, newBook:{book:null, error:action.message, isAdding:false}}

  case 'FETCH_BOOK_REQUEST':
         return { ...currentState, booksList: {books:[], error: null, isFetching: true} };

   case 'FETCH_BOOK_SUCCESS':
          //return action.books;
           return { ...currentState, booksList: {books: action.books, error:null, isFetching: false} };
   case 'HIDE_BOOK_MESSAGE':
	         return { ...currentState, booksList: {books:[...currentState.booksList.books], error:null,isFetching: false},newBook:{book:null, error:null, isAdding:false}};

    default:
        return currentState;

  }
};

// const books = (state = { }, action) => {
//   switch (action.type) {
//     case 'FETCH_BOOK_SUCCESS':
//       return {
//         ...state,
//         [action.reddit]: posts(state[action.reddit], action)
//       }
//     default:
//       return state
//   }
// }

export const bookReducer = (currentState = [], action) => {
  switch (action.type) {
    case 'FETCH_BOOK_BY_ID_SUCCESS':
      return action.book;
    default:
      return currentState;
  }
};
