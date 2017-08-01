import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import * as bookActions from '../../actions/bookActions';
import BookForm from './BookForm';

class BookPage extends React.Component {

  constructor(props) {
    //Pass props back to parent
    super(props);
  }

  componentWillMount() {
    this.props.fetchBooks();
  }

  submitBook(input){
    this.props.createBook(input);
  }

  render(){
    const { isFetching, books } = this.props.booksList;
    const isEmpty = books.length === 0;
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
           <th><td>Title</td><td></td></th>
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
          <h3>Books</h3>
          { /* Import and inject Book form */}
          <BookForm submitBook={this.submitBook.bind(this)}/>
          </div>
      </div>
    );
  }
}

// Map state from store to props
const mapStateToProps = (state,ownProps) => {
  return {
    // You can now say this.props.books
    booksList: state.books.booksList
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
