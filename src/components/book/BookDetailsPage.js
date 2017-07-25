import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookDetails from './BookDetails';

import * as bookActions from '../../actions/bookActions';

class BookDetailsPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.addToFavourite = this.addToFavourite.bind(this);
  }

  componentDidMount(){
    this.props.mappedfetchBookById(this.props.params.id);
  }

  addToFavourite(book){
     const item = {
       id:book.id,
       title:book.title,
       price:book.price
     }
     this.props.mappedaddToFavourite(item);
  }

  render(){
    return(
      <div>
     <h1>Book Details Page</h1>
     <BookDetails book={this.props.book} addToFavourite={this.addToFavourite}/>
      </div>
    );
  };
}

const mapStateToProps = (state,ownProps) => {
  return {
     book: state.book
  }
}
 const mapDispatchToProps = (dispatch) => {
   return {
     // This dispatch will trigger
     // the Ajax request we setup
     // in our actions
     mappedfetchBookById: bookId => dispatch(bookActions.fetchBookById(bookId)),
     mappedaddToFavourite: item => dispatch(bookActions.addToFavourite(item))
   }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(BookDetailsPage);
