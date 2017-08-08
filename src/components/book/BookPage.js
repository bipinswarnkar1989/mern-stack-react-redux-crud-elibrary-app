import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
//import PropTypes from 'prop-types'
import { Alert,Glyphicon,Button,Modal } from 'react-bootstrap';

import * as bookActions from '../../actions/bookActions';
import BookForm from './BookForm';
import * as appActions from '../../actions/appActions';

import './BookPage.css';

class BookPage extends React.Component {
   constructor(props){
     super(props);
     this.hideBookMessage = this.hideBookMessage.bind(this);
     this.hideDeleteModal = this.hideDeleteModal.bind(this);
     this.cofirmDeleteBook = this.cofirmDeleteBook.bind(this);
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

  hideDeleteModal(){
    this.props.mappedhideDeleteModal();
  }

  showDeleteModal(bookToDelete){
    this.props.mappedshowDeleteModal(bookToDelete);console.log(bookToDelete);
  }

  cofirmDeleteBook(){
    this.props.mappedConfirmDeleteBook(this.props.mapppedBookToDel.bookToDelete);
  }

  showEditModal(bookToEdit){

  }


  render(){
    const { isFetching, books } = this.props.booksList;
    const { book, isAdding, error } = this.props.newBook;
    let { bookAddMessage, BookMessageStyle }= this.props;
    const MapAppState  = this.props.mappedAppSate;
    const deleteBook = this.props.mapppedBookToDel;
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

          <table className="table booksTable">
          <thead>
           <tr><th>Title</th><th className="textCenter">Edit</th><th className="textCenter">Delete</th><th className="textCenter">Pdf</th><th className="textCenter">View</th></tr>
          </thead>
          <tbody>
          {books.map((b,i) => <tr key={i}>
          <td>{b.title}</td>
           <td className="textCenter"><Button onClick={() => this.showEditModal(b)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="pencil" /></Button></td>
           <td className="textCenter"><Button onClick={() => this.showDeleteModal(b)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td>
           <td className="textCenter"><a target="__blank" href={`//localhost:8080/${b.fileName}`}><Button bsStyle="warning" bsSize="xsmall"><Glyphicon glyph="file" /> Pdf</Button></a></td>
           <td className="textCenter"><Link to={`/book/${b._id}`}>View Details</Link> </td>
           </tr> )}
          </tbody>
          </table>
          </div>

      </div>
      <Modal
      show={deleteBook.showDeleteModal}
      onHide={this.hideDeleteModal}
      container={this}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">Delete Your Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {deleteBook.bookToDelete && !deleteBook.error && !deleteBook.isFetching &&
        <Alert bsStyle="warning">
   Are you sure you want to delete this book <strong>{deleteBook.bookToDelete.title} </strong> ?
 </Alert>
      }
      {deleteBook.bookToDelete && deleteBook.error &&
        <Alert bsStyle="warning">
   Failed. <strong>{deleteBook.error} </strong>
 </Alert>
      }

      {deleteBook.bookToDelete && !deleteBook.error && deleteBook.isFetching &&
        <Alert bsStyle="success">
    <strong>Deleting.... </strong>
 </Alert>
      }

      {!deleteBook.bookToDelete && !deleteBook.error && deleteBook.successMsg &&
        <Alert bsStyle="success">
   Book <strong>{deleteBook.successMsg} </strong>
 </Alert>
      }
      </Modal.Body>
      <Modal.Footer>
       {!deleteBook.successMsg && !deleteBook.isFetching &&
         <div>
         <Button onClick={this.cofirmDeleteBook}>Yes</Button>
         <Button onClick={this.hideDeleteModal}>No</Button>
         </div>
      }
      {deleteBook.successMsg && !deleteBook.isFetching &&
        <Button onClick={this.hideDeleteModal}>Close</Button>
      }
      </Modal.Footer>
    </Modal>


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
    mappedAppSate: state.appState,
    mapppedBookToDel: state.books.deleteBook
  }
};

// Map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.createBook
    createBook: book => dispatch(bookActions.createBook(book)),
    fetchBooks: () => dispatch(bookActions.fetchBooks()),
    createBookFailed: message => dispatch(bookActions.createBookFailed(message)),
    mappedhideBookMessage: () => dispatch(bookActions.hideBookMessage()),
    mappedshowDeleteModal: bookToDelete => dispatch(bookActions.showDeleteModal(bookToDelete)),
    mappedhideDeleteModal: () => dispatch(bookActions.hideDeleteModal()),
    mappedConfirmDeleteBook: (bookToDelete) => dispatch(bookActions.confirmDeleteBook(bookToDelete))
  }
}

// BookPage.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
