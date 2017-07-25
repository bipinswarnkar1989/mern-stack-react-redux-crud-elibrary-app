import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import * as bookActions from '../../actions/bookActions';
import BookForm from './BookForm';

class BookPage extends React.Component {
  constructor(props) {
    //Pass props back to parent
    super(props);
  }

  submitBook(input){
    this.props.createBook(input);
  }

  render(){
    //Title input tracker
    //let titleInput;

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
          {this.props.books.map((b,i) => <tr key={i}>
          <td>{b.title}</td>
           <td><Link to={`/books/${b.id}`}>View</Link> </td>
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
    books: state.books
  }
};

// Map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.createBook
    createBook: book => dispatch(bookActions.createBook(book))
  }
}

// BookPage.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
