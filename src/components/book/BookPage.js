import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
//import PropTypes from 'prop-types'

import * as bookActions from '../../actions/bookActions';
import BookForm from './BookForm';

class BookPage extends React.Component {
  //  constructor(props){
  //    super(props);
  //  }
  componentWillMount() {
    this.props.fetchBooks();
  }

  submitBook(input){
    const fileName = document.getElementById('file').files[0].name;
    const fileExt = fileName.split('.').pop();
    if(fileExt === "pdf"){
      const data = new FormData();
      data.append('title',input.title);
      data.append('author',input.author);
      data.append('price',input.price);
      data.append('year',input.year);
      data.append('file',document.getElementById('file').files[0]);
      this.props.createBook(data);
    }else{
    alert('Only pdf file is allowed');
  }
  }


  render(){
    const { isFetching, books } = this.props.booksList;
    const { book, isAdding, error } = this.props.newBook;
    let { bookAddMessage }= this.props;
    const isEmpty = books.length === 0;
    if (!book && isAdding) {
      bookAddMessage = 'New Book Adding..';
    }
    if (book && !isAdding) {
      bookAddMessage = `New Book ${book.title} Added Successfully`;
    }
    if(!book && !isAdding){
      bookAddMessage = error;
    }
    if (isEmpty && isFetching ) {
      return <h2><i>Loading...</i></h2>
    }

    //return jsx
    return(
      <div className="row">
          <div className="col-md-6">
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
          <div className="col-md-6">
        <h3 onClick={this.hidebookAddMessage} className="bookAddMessage">{bookAddMessage}</h3>
          { /* Import and inject Book form */}
          <BookForm submitBook={this.submitBook.bind(this)} handleUploadFile={this.handleUploadFile}/>
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
    newBook: state.books.newBook
  }
};

// Map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.createBook
    createBook: book => dispatch(bookActions.createBook(book)),
    fetchBooks: () => dispatch(bookActions.fetchBooks())
  }
}

// BookPage.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
