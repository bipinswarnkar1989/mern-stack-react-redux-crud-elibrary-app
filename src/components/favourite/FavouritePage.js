import React from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';

class FavouritePage extends React.Component{
  
  componentDidMount(){
    this.props.mappedFetchFavourite();
  }
  render(){
    return(
      <div>
        <h1>Cart Page</h1>
        <table className="table">
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                  </tr>
                  {this.props.mappedItems.map((item,index) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.book.title}</td>
                        <td>{item.book.price}</td>
                      </tr>
                    );
                  })}
            </table>
        </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    mappedItems: state.favourite.favourites
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    mappedFetchFavourite: () => dispatch(bookActions.fetchFavourite())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FavouritePage);
