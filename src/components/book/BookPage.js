import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
//import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap';

import * as bookActions from '../../actions/bookActions';
import BookForm from './BookForm';
import * as appActions from '../../actions/appActions';

import './BookPage.css';

class BookPage extends React.Component {
   constructor(props){
     super(props);
     this.hideBookMessage = this.hideBookMessage.bind(this);
   }
  componentWillMount() {
    this.props.fetchBooks();
    this.props.mappedAppSate.showAddBook = false;
  }
  componentDidUpdate(){
    this.props.newBook.book = null;
    this.props.newBook.error = null;
  }

  submitBook(e){
    e.preventDefault();
    const form = document.getElementById('myForm');
    if(form.file.value === '' || form.title.value === '' || form.author.value === '' || form.price.value === '' || form.year.value === ''){
      this.props.createBookFailed('Fill all fields');
      return;
    }
    const fileName = document.getElementById('file').files[0].name;
    const fileExt = fileName.split('.').pop();
    if(fileExt === "pdf"){
      const data = new FormData();
      data.append('title',form.title.value);
      data.append('author',form.author.value);
      data.append('price',form.price.value);
      data.append('year',form.year.value);
      data.append('file',document.getElementById('file').files[0]);
      this.props.createBook(data);
      form.reset();
    }else{
    alert('Only pdf file is allowed');
  }
  }

  hideBookMessage(e){
    e.preventDefault();
    this.props.mappedhideBookMessage();
  }


  render(){
    const { isFetching, books } = this.props.booksList;
    const { book, isAdding, error } = this.props.newBook;
    let { bookAddMessage, BookMessageStyle }= this.props;
    const isEmpty = books.length === 0;
    if (!book && isAdding) {
      bookAddMessage = 'New Book Adding..';
      BookMessageStyle = 'info';
    }
    if (book && !isAdding) {
      bookAddMessage = ` Added Successfully`;
      BookMessageStyle = 'success';
    }
    if(!book && !isAdding){
      bookAddMessage = error;
      BookMessageStyle = 'danger';
    }
    if(error){
      bookAddMessage = error;
      BookMessageStyle ='danger';
    }
    if (isEmpty && isFetching ) {
      return <h2><i>Loading...</i></h2>
    }
    if (!book && !isAdding && !error) {
      bookAddMessage = null;
    }

    //return jsx
    return(
      <div className="BookPageDiv">
       <div>
       {this.props.mappedAppSate.showAddBook &&
       <div className="addBookBox">
       <h3 className="addBookHeading">Add New Book</h3>
        {/* Import and inject Book form */}
       <BookForm submitBook={this.submitBook.bind(this)}/>
        {bookAddMessage  &&
          <Alert bsStyle={BookMessageStyle} onDismiss={this.hideBookMessage}>
            <strong>{book && <Link to={`/book/${book._id}`}><span className="addBookHeading">{book.title}</span></Link>} {bookAddMessage}</strong>
          </Alert>
      }
       </div>
     }
       </div>

      <div className="row">
          <div className="col-md-12">
          <h3>Books</h3>

          <table className="table">
          <thead>
           <tr><th>Title</th><th></th></tr>
          </thead>
          <tbody>
          {books.map((b,i) => <tr key={i}>
          <td>{b.title}</td>
           <td><Link to={`/book/${b._id}`}>View</Link> </td>
           </tr> )}
          </tbody>
          </table>
          </div>

      </div>
      </div>
    );
  }
}

// Map state from store to props
const mapStateToProps = (state,ownProps) => {
  return {
    // You can now say this.props.books
    booksList: state.books.booksList,
    newBook: state.books.newBook,
    mappedAppSate: state.appState
  }
};

// Map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.createBook
    createBook: book => dispatch(bookActions.createBook(book)),
    fetchBooks: () => dispatch(bookActions.fetchBooks()),
    createBookFailed: message => dispatch(bookActions.createBookFailed(message)),
    mappedhideBookMessage: () => dispatch(bookActions.hideBookMessage())
  }
}

// BookPage.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
